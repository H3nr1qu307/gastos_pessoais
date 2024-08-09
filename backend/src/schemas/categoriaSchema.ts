import { z } from 'zod';

export const CategoriaSchema = z.object({
  nome: z.string(),
  descricao: z.string().optional(),
  usuarioId: z.number()
});
