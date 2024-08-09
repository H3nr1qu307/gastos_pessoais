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

    // Validando os dados com Zod e incluindo o usuarioId
    const data = CategoriaSchema.parse({
      nome,
      descricao,
      usuarioId: Number(usuarioId),
    });

    const categoria = await prisma.categoria.create({ data });

    return categoria;
  });

  fastify.get('/usuarios/:usuarioId/categorias', async (request, reply) => {
    const categorias = await prisma.categoria.findMany();
    return categorias;
  });
}
