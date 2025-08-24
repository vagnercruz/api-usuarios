const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { escreverJson } = require('../utils/arquivo');

const CAMINHO_BANCO = path.resolve(process.cwd(), 'data', 'users.json');

// Armazena em memória
let usuarios = [];

async function carregar() {
  try {
    const bruto = await fs.readFile(CAMINHO_BANCO, 'utf-8');
    usuarios = JSON.parse(bruto);
    if (!Array.isArray(usuarios)) usuarios = [];
  } catch (err) {
    if (err.code === 'ENOENT') {
      usuarios = [];
      await escreverJson(CAMINHO_BANCO, usuarios);
    } else {
      throw err;
    }
  }
}

function listar() {
  return [...usuarios];
}

function buscarPorId(id) {
  return usuarios.find((u) => u.id === id) || null;
}

// Cria usuário com id
async function criar(dados) {
  const novo = { id: uuidv4(), ...dados };
  usuarios.push(novo);
  await escreverJson(CAMINHO_BANCO, usuarios);
  return novo;
}

// Atualiza PUT 
async function atualizar(id, dados) {
  const indice = usuarios.findIndex((u) => u.id === id);
  if (indice === -1) return null;
  const existente = usuarios[indice];
  const atualizado = { ...existente, ...dados, id: existente.id };
  usuarios[indice] = atualizado;
  await escreverJson(CAMINHO_BANCO, usuarios);
  return atualizado;
}

async function remover(id) {
  const indice = usuarios.findIndex((u) => u.id === id);
  if (indice === -1) return false;
  usuarios.splice(indice, 1);
  await escreverJson(CAMINHO_BANCO, usuarios);
  return true;
}

module.exports = {
  carregar,
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};