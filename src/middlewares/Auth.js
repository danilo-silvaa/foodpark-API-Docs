import jwt from 'jsonwebtoken';

export default {
    preHandler: (request, reply, done) => {
        const token = request.headers.authorization?.replace(/^Bearer /, '');

        jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
            if (error) {
                return reply.code(401).send({ error: { code: 401, message: error.message, status: 'UNAUTHORIZED' } });
            }

            request.adminId = decoded.id
            done()
        });
    }
};