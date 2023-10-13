import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { RecaptchaV3 } from '../services/RecaptchaService';

const prisma = new PrismaClient();
const recaptcha = new RecaptchaV3();

export default {
    async login(request, reply) {
        try {
            const { email, password } = request.body;

            if (!email || !password) {
                return reply.code(400).send({ error: { code: 400, message: 'Email and password are required.', status: 'BAD_REQUEST' } });
            }

            if (!await recaptcha.verify(request)) {
                return reply.code(400).send({ error: { code: 400, message: 'Invalid reCAPTCHA.', status: 'BAD_REQUEST' } });
            }

            const admin = await prisma.Admin.findUnique({ where: { email } });

            if (!admin || !bcrypt.compareSync(password, admin.password)) {
                return reply.code(401).send({ error: { code: 401, message: 'Email or password incorrect.', status: 'UNAUTHORIZED' } });
            }

            const token = jwt.sign({ id: admin.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

            return reply.send({ token });
        } catch (error) {
            return reply.code(500).send({ error: { code: 500, message: 'Internal Server Error.', status: 'INTERNAL_SERVER_ERROR' } });
        }
    },

    async admin(request, reply) {
        try {
            const admin = await prisma.Admin.findUnique({ where: { id: request.adminId }, select: { name: true, email: true, } });

            if (!admin) {
                return reply.code(404).send({ error: { code: 404, message: 'Admin not found.', status: 'NOT_FOUND' } });
            }

            return reply.send(admin);
        } catch (error) {
            return reply.code(500).send({ error: { code: 500, message: 'Internal Server Error.', status: 'INTERNAL_SERVER_ERROR' } });
        }
    }
};