import { FastifyInstance } from 'fastify'
import { requestEmailChangeRoute } from './request-email-change.route.ts'
import { confirmEmailRoute } from './confirm-email.route.ts'
import { cancelEmailChangeRoute } from './cancel-email-change.route.ts'
import { confirmEmailChangeRoute } from './confirm-email-change.route.ts'
import { sendVerificationEmailRoute } from './send-verification-email.route.ts'

// Prefix: /api/email-verification
const emailVerificationRoutes = async (fastify: FastifyInstance) => {
    await Promise.all([
        requestEmailChangeRoute(fastify),
        confirmEmailChangeRoute(fastify),
        confirmEmailRoute(fastify),
        cancelEmailChangeRoute(fastify),
        sendVerificationEmailRoute(fastify),
    ])
}

export default emailVerificationRoutes