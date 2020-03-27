const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/* metodos HTTP
*  GET buscar uma informacao
* POST criar uma informacao
* PUT editar uma informacao
* DELETE deletar uma informacao
*/
/* tipos de paramentros
* Query : paramentros nomeados e enviados na rota, apos ?  filtro, pages, etc
* route params: paramentros pra identificar recursos rotas
* Request Body:
*/
app.listen(3333);
