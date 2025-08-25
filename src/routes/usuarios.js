const express = require('express');
const repo = require('../repositorio/usuariosRepo');
const { validarCriacao, validarAtualizacao } = require('../validacao/usuarioSchema');

const router = express.Router();

// Lista todos os usuários. (GET)
router.get('/', (_req, res) => {
  const todos = repo.listar();
  return res.json(todos);
});

router.get('/:id', (req, res, next) => {
  const usuario = repo.buscarPorId(req.params.id);
  if (!usuario) return next({ tipo: 'NAO_ENCONTRADO' });
  return res.json(usuario);
});


// Cria um novo usuário (POST).

router.post('/', async (req, res, next) => {
  try {
    const { id, ...resto } = req.body || {};
    const dados = validarCriacao(resto);
    const criado = await repo.criar(dados);
    res.status(201)
      .location(`/usuarios/${criado.id}`)
      .json(criado);
  } catch (err) {
    next(err);
  }
});

// Atualiza um usuário. (PUT)
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { id: _idDoBody, ...resto } = req.body || {};
    const dados = validarAtualizacao(resto);
    const atualizado = await repo.atualizar(id, dados);
    if (!atualizado) return next({ tipo: 'NAO_ENCONTRADO' });
    return res.json(atualizado);
  } catch (err) {
    next(err);
  }
});

// Remove o usuário.
router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await repo.remover(req.params.id);
    if (!ok) return next({ tipo: 'NAO_ENCONTRADO' });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
});