const { z } = require('zod');

const UFS_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO'
];

const base = {
  nome: z.string({ required_error: 'nome é obrigatório' }).min(2, 'nome deve ter pelo menos 2 caracteres'),
  sobrenome: z.string({ required_error: 'sobrenome é obrigatório' }).min(2, 'sobrenome deve ter pelo menos 2 caracteres'),
  idade: z.number({ required_error: 'idade é obrigatória' }).int('idade deve ser um inteiro').min(0, 'idade mínima é 0').max(120, 'idade máxima é 120'),
  profissao: z.string({ required_error: 'profissao é obrigatória' }).min(2, 'profissao deve ter pelo menos 2 caracteres'),
  cidade: z.string({ required_error: 'cidade é obrigatória' }).min(2, 'cidade deve ter pelo menos 2 caracteres'),
  estado: z.enum(UFS_BR, { errorMap: () => ({ message: 'estado deve ser uma UF válida' }) }),
};

// Schema para criação (POST)
const schemaCriacao = z.object(base);

// Schema para atualização (PUT) — corpo completo, mas id não pode mudar
const schemaAtualizacao = z.object(base);

// Valida e converte tipos (ex.: idade pode vir como string)
function validarCriacao(payload) {
  return schemaCriacao.parse(convert(payload));
}
function validarAtualizacao(payload) {
  return schemaAtualizacao.parse(convert(payload));
}
function convert(payload) {
  const obj = { ...payload };
  if (obj.idade != null) obj.idade = Number(obj.idade);
  return obj;
}

module.exports = {
  validarCriacao,
  validarAtualizacao,
  UFS_BR,
};