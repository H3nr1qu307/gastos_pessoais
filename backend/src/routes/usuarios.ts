import { FastifyInstance } from "fastify";
import{ z } from 'zod'
import { UsuarioSchema } from "../schemas/usuarioSchema";
import prisma from "../lib/prisma";

export default async function usuariosRoutes(fastify: FastifyInstance) {
    fastify.post('/usuarios', async (request, reply) => {
        const data = UsuarioSchema.parse(request.body)
        const usuario = await prisma.usuario.create({ data })
        return usuario
    })

    //fastify.post()
}