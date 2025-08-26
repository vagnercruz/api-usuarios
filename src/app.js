const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/openapi.json');
const usuariosRouter = require('./routes/usuarios');
const { manipuladorErros } = require('./middlewares/erros');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/usuarios', usuariosRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(manipuladorErros);

module.exports = app;
