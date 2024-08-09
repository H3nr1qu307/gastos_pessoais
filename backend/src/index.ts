import fastify from 'fastify';
import appRoutes from './routes';

const app = fastify();

app.register(appRoutes)

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Servidor rodando em ${address}`);
  console.log(`Servidor rodando em ${address}`)
});
