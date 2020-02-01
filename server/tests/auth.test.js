const request = require('supertest')
const app = require('../../app').app
const User = require('../models/User')
const assert = require('assert')

const user = { email: 'test@test.com', password: 'password' }

const pathPrefix = '/api/auth'

describe('auth', () => {
    it('register', async () => {
        const dbUser = await User.findOne({ email: user.email })
        if (dbUser) {
            await User.deleteOne({ email: user.email })
        }
        const res = await request(app)
            .post(`${pathPrefix}/register`)
            .send(user)
            .set('Content-Type', 'application/json')
            .expect(200)

        assert(res.body.success, true)
    })

    it('login', async () => {
        const res = await request(app)
            .post(`${pathPrefix}/login`)
            .send(user)
            .set('Content-Type', 'application/json')
            .expect(200)

        assert(res.body.success, true)
    })
})
