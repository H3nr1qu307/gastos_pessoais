import { FastifyInstance } from "fastify";
import{ z } from 'zod'
import { CategoriaSchema } from "../schemas/categoriaSchema";
import prisma from "../lib/prisma";

type Body = {
    nome: string;
    descricao?: string;
};

type Params = {
  usuarioId: string; 
};

export default async function categoriasRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: Params, Body: Body }>('/usuarios/:usuarioId/categorias', async (request, reply) => {
    const { usuarioId } = request.params;
    const { nome, descricao } = request.body;

    const nomeformatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLocaleLowerCase()

    try {
      const isCategoria = await prisma.categoria.findFirst({
        where: { nome: nomeformatado }
      })

      if(isCategoria){
        return reply.status(400).send({erro: 'Categoria já existente'})
      }

      const data = CategoriaSchema.parse({
        nome: nomeformatado,
        descricao,
        usuarioId: Number(usuarioId),
      })

      const categoria = await prisma.categoria.create({ data });

      return categoria;

    } catch (err) {
      return reply.status(500).send({ err: 'Erro ao criar categoria' })
    }
  });

  fastify.get('/usuarios/:usuarioId/categorias', async (request, reply) => {
    const categorias = await prisma.categoria.findMany();
    return categorias;
  });
}
