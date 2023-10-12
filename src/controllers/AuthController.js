import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    async login(request, reply) {
        try {
            const { email, password } = request.body;

            if (!email || !password) {
                return reply.code(400).send({ error: { code: 400, message: 'Email and password are required.', status: 'FAILED_PRECONDITION' } });
            }

            const admin = await prisma.Admin.findUnique({ where: { email } });

            if (!admin || !bcrypt.compareSync(password, admin.password)) {
                return reply.code(401).send({ error: { code: 401, message: 'Email or password incorrect.', status: 'UNAUTHORIZED' } });
            }

            const token = jwt.sign({ id: admin.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

            return reply.send({ token });
        } catch (error) {
            return reply.code(500).send(error);
        }
    },

    async admin(request, reply) {
        try {
            const admin = await prisma.Admin.findUnique({ where: { id: request.adminId }, select: { name: true, email: true, } });

            if (!admin) {
                return reply.code(400).send({ error: { code: 400, message: 'Admin not found.', status: 'FAILED_PRECONDITION' } });
            }

            return reply.send(admin);
        } catch (error) {
            return reply.code(500).send(error);
        }
    }
};