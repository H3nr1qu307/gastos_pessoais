import { FastifyInstance } from 'fastify';
import categoriasRoutes from './categorias';
import usuariosRoutes from './usuarios';

export default async function appRoutes(fastify: FastifyInstance) {
    fastify.register(categoriasRoutes)
    fastify.register(usuariosRoutes)
}