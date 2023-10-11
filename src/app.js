import fastify from 'fastify';
import cors from '@fastify/cors';
import router from './routes';
import 'dotenv/config'

const server = fastify();
await server.register(cors, { origin: true })

server.register(router, { prefix: '/v1' });

server.listen({
    host: '0.0.0.0',
    port: process.env.port ?? 3333
})