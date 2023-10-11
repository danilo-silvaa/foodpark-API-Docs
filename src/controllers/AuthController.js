import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    async login(request, reply) {
        try {
            const { email, password } = request.body;

            if (!email || !password) {
                return reply.send({ error: { code: 400, message: 'Email and password are required.', status: 'FAILED_PRECONDITION' } });
            }

            const admin = await prisma.Admin.findUnique({ where: { email } });

            if (!admin || !bcrypt.compareSync(password, admin.password)) {
                return reply.send({ error: { code: 401, message: 'Email or password incorrect.', status: 'UNAUTHORIZED' } });
            }

            const token = jwt.sign({ id: admin.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

            return reply.send(token);
        } catch (error) {
            return reply.send(error);
        }
    },
};