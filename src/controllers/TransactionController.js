import { PrismaClient } from '@prisma/client';
import { StatisticsService } from '../services/StatisticsService'
const prisma = new PrismaClient();

export default {
    async createTransaction(request, reply) {
        try {
            const { description, price, type } = request.body;

            const transaction = await prisma.Transactions.create({
                data: {
                    description,
                    price,
                    type
                }
            });

            return reply.send(transaction);
        } catch (error) {
            return reply.code(500).send(error);
        }
    },

    async findTransactions(request, reply) {
        try {
            const take = 10;
            const skip = Number(request.query?.skip) || 0;

            const [ transactions, total ] = await prisma.$transaction([
                prisma.Transactions.findMany({ take, skip }),
                prisma.Transactions.count()
            ])

            const totalPages = Math.ceil(total / take)

            return reply.send({ total, totalPages, transactions });
        } catch (error) {
            return reply.code(500).send(error);
        }
    },

    async findStatistics(request, reply) {
        try {
            const transactions = await prisma.Transactions.findMany();

            const statisticsService = new StatisticsService(transactions).get();

            return reply.send(statisticsService);
        } catch (error) {
            return reply.code(500).send(error);
        }
    },

    async updateTransaction(request, reply) {
        try {
            const { id, description, price, type } = request.body;

            let transaction = await prisma.Transactions.findUnique({ where: { id: Number(id) } });

            if (!transaction) {
                return reply.code(400).send({ error: { code: 400, message: 'Transaction not found.', status: 'FAILED_PRECONDITION' } });
            }

            transaction = await prisma.Transactions.update({
                where: { id: Number(id) },
                data: { description, price, type },
            });

            return reply.send(transaction);
        } catch (error) {
            return reply.code(500).send(error);
        }
    },

    async deleteTransaction(request, reply) {
        try {
            const { id } = request.params;

            let transaction = await prisma.Transactions.findUnique({ where: { id: Number(id) } });

            if (!transaction) {
                return reply.code(400).send({ error: { code: 400, message: 'Transaction not found.', status: 'FAILED_PRECONDITION' } });
            }

            await prisma.Transactions.delete({ where: { id: Number(id) } });

            return reply.send('Transaction deleted successfully.');
        } catch (error) {
            return reply.code(500).send(error);
        }
    },
};