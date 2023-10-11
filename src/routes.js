import AuthMiddleware from './middlewares/Auth';
import AuthController from './controllers/AuthController';
import TransactionController from './controllers/TransactionController';


export default function (fastify, opts, done) {
    fastify.post('/login', AuthController.login)
    fastify.get('/statistics', AuthMiddleware, TransactionController.findStatistics)
    fastify.post('/transaction', AuthMiddleware, TransactionController.createTransaction)
    fastify.get('/transactions', AuthMiddleware, TransactionController.findTransactions)
    fastify.put('/transaction', AuthMiddleware, TransactionController.updateTransaction)
    fastify.delete('/transaction/:id', AuthMiddleware, TransactionController.deleteTransaction)
    done()
}