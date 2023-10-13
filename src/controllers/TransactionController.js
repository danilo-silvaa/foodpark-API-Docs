import { PrismaClient } from '@prisma/client';
import { StatisticsService } from '../services/StatisticsService';
const prisma = new PrismaClient();

export default {
    async createTransaction(request, reply) {
        try {
            const { description, price, type } = request.body;

            if (isNaN(Number(price))) {
                return reply.code(400).send({ error: { code: 400, message: 'Invalid price format.', status: 'BAD_REQUEST' } });
            }

            if (typeof type !== 'boolean') {
                return reply.code(400).send({ error: { code: 400, message: 'Invalid type format.', status: 'BAD_REQUEST' } });
            }

            const transaction = await prisma.Transactions.create({
                data: {
                    description,
                    price,
                    type
                }
            });

            return reply.send(transaction);
        } catch (error) {
            return reply.code(500).send({ error: { code: 500, message: 'Internal Server Error.', status: 'INTERNAL_SERVER_ERROR' } });
        }
    },

    async findTransactions(request, reply) {
        try {
            const pageNum = Number(request.params?.pageNum) || 1;

            const maxItems = 10;
            const offset = (pageNum - 1) * maxItems;

            const [ transactions, total ] = await prisma.$transaction([
                prisma.Transactions.findMany({ take: maxItems, skip: offset }),
                prisma.Transactions.count()
            ])

            const totalPages = Math.ceil(total / maxItems)

            return reply.send({ total, totalPages, transactions });
        } catch (error) {
            return reply.code(500).send({ error: { code: 500, message: 'Internal Server Error.', status: 'INTERNAL_SERVER_ERROR' } });
        }
    },

    async findStatistics(request, reply) {
        try {
            const transactions = await prisma.Transactions.findMany();

            const statisticsService = new StatisticsService(transactions).get();

            return reply.send(statisticsService);
        } catch (error) {
            return reply.code(500).send({ error: { code: 500, message: 'Internal Server Error.', status: 'INTERNAL_SERVER_ERROR' } });
        }
    },

    async updateTransaction(request, reply) {
        try {
            const { id, description, price, type } = request.body;

            if (isNaN(Number(id))) {
                return reply.code(400).send({ error: { code: 400, message: 'Invalid id format.', status: 'BAD_REQUEST' } });
            }

            if (isNaN(Number(price))) {
                return reply.code(400).send({ error: { code: 400, message: 'Invalid price format.', status: 'BAD_REQUEST' } });
            }

            if (typeof type !== 'boolean') {
                return reply.code(400).send({ error: { code: 400, message: 'Invalid type format.', status: 'BAD_REQUEST' } });
            }

            let transaction = await prisma.Transactions.findUnique({ where: { id: Number(id) } });

            if (!transaction) {
                return reply.code(404).send({ error: { code: 404, message: 'Transaction not found.', status: 'NOT_FOUND' } });
            }

            transaction = await prisma.Transactions.update({
                where: { id: Number(id) },
                data: { description, price, type },
            });

            return reply.send(transaction);
        } catch (error) {
            return reply.code(500).send({ error: { code: 500, message: 'Internal Server Error.', status: 'INTERNAL_SERVER_ERROR' } });
        }
    },

    async deleteTransaction(request, reply) {
        try {
            const { id } = request.params;

            if (isNaN(Number(id))) {
                return reply.code(400).send({ error: { code: 400, message: 'Invalid ID format.', status: 'BAD_REQUEST' } });
            }

            const transaction = await prisma.Transactions.findUnique({ where: { id: Number(id) } });

            if (!transaction) {
                return reply.code(404).send({ error: { code: 404, message: 'Transaction not found.', status: 'NOT_FOUND' } });
            }

            await prisma.Transactions.delete({ where: { id: Number(id) } });

            return reply.send('Transaction deleted successfully.');
        } catch (error) {
            return reply.code(500).send({ error: { code: 500, message: 'Internal Server Error.', status: 'INTERNAL_SERVER_ERROR' } });
        }
    },
};