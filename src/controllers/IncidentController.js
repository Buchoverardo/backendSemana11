const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query; // pego a pagina

    const [count] = await connection('incidents').count(); // conta quantos retistro eu tenho na tabela

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5) // limite por pagina
    .offset((page - 1) * 5) // pulo registro, -1 * 5 pra ter 5 registros em cada pagina
    .select(['incidents.*', 
      'ongs.name', 
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
  ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json( incidents );
  },

  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title, description, value, ong_id,
    })

    return res.json({ id })
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if(incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'operação não permitida.' });
    }

    await connection('incidents').where('id', id).delete();

    return res.json({ mensagem: 'Incidente deletado' });
  }
};