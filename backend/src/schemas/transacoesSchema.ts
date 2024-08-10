import { z } from 'zod';

export const TransacaoSchema = z.object({
    tipo: z.enum(['GANHO', 'GASTO']),
    valor: z.number(),
    descricao: z.string().optional(),
    categoriaId: z.number(),
    usuarioId: z.number()
});