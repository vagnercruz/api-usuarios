const fs = require('fs/promises');

async function escreverJson(caminho, dados) {
  const conteudo = JSON.stringify(dados, null, 2);
  await fs.writeFile(caminho, conteudo, 'utf-8');
}

module.exports = { escreverJson };