/**
 * Servidor HTTP da aplicação.
 * Responsável por subir a API após carregar os dados do arquivo. 
 */

const app = require('./app');
const repo = require('repositorio/UsuariosRepo');

const PORTA = process.env.PORTA || 3333;

async function main() {
  await repo.carregar();
  app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
    console.log(`Swagger rodando em http://localhost:${PORTA}/docs`);
  });
}

main().catch((err) => {
  console.error('Erro ao iniciar a API:', err);
  process.exit(1);
});