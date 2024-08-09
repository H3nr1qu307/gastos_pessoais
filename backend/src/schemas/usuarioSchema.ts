import { z } from 'zod';

export const UsuarioSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string().min(6)
});