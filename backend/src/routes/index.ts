import { FastifyInstance } from 'fastify';
import categoriasRoutes from './categorias';
import usuariosRoutes from './usuarios';
import { transacoesRoutes } from './transacoes';

export default async function appRoutes(fastify: FastifyInstance) {
    fastify.register(categoriasRoutes)
    fastify.register(usuariosRoutes)
    fastify.register(transacoesRoutes)
}