/**
 * Ajustando as Exceções conhecidas em Respostas HTTP (400/404/...).
 */

function manipuladorErros(err, _req, res, _next) {
  if (err && err.issues && Array.isArray(err.issues)) {
    return res.status(400).json({
      erro: 'Validação Falhou',
      detalhes: err.issues.map((i) => ({ caminho: i.path, mensagem: i.message })),
    });
  }

  if (err && err.tipo === 'NAO_ENCONTRADO') {
    return res.status(404).json({ erro: 'Recurso não encontrado' });
  }

  console.error(err);
  return res.status(500).json({ erro: 'Erro Interno' });

  module.exports = {manipuladorErros};
}
