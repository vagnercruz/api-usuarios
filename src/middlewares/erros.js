function manipuladorErros(err, _req, res, _next) {
  if (err && (err.issues || err.errors)) {
    const issues = err.issues || err.errors;
    return res.status(400).json({
      erro: 'Erro de validação',
      detalhes: issues.map((i) => ({
        caminho: Array.isArray(i.path) ? i.path.map(String) : [String(i.path)],
        mensagem: i.message,
      })),
    });
  }

  if (err && err.tipo === 'NAO_ENCONTRADO') {
    return res.status(404).json({ erro: 'Recurso não encontrado' });
  }

  console.error(err);
  return res.status(500).json({ erro: 'Erro Interno' });
}

module.exports = { manipuladorErros };