import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma";
import dayjs from "dayjs";
import { TransacaoSchema } from "../schemas/transacoesSchema";

type Body = {
    tipo: Enumerator;
    valor: Number;
    descricao?: string;
}

type Params = {
    usuarioId: string;
    categoriaId: string;
}

export async function transacoesRoutes(fastify: FastifyInstance) {
    fastify.post<{Params: Params, Body: Body}>('/usuarios/:usuarioId/categorias/:categoriaId/transacoes', async (request, reply) => {
        const { usuarioId, categoriaId } = request.params
        const { tipo, valor, descricao } = request.body

        const data = TransacaoSchema.parse({
            tipo,
            valor,
            descricao,
            usuarioId: Number(usuarioId),
            categoriaId: Number(categoriaId)
        });

        const transacao = await prisma.transacao.create({ data });

        return transacao;
    })

    fastify.get('/usuarios/:usuarioId/transacoes', async (request, reply) => {
        const transacoes = await prisma.transacao.findMany();
        return transacoes;
    })

    fastify.get<{ Params: { usuarioId: string, categoriaId: string } }>('/usuarios/:usuarioId/categorias/:categoriaId/transacoes', async (request, reply) => {
          const { categoriaId } = request.params;
      
        try {
        const transacoes = await prisma.transacao.findMany({
            where: { categoriaId: Number(categoriaId) }
        });
    
        return transacoes;
        } catch (err) {
        return reply.status(500).send({ err: 'Erro ao buscar transações' });
        }
    })

    
}