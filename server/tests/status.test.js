const request = require('supertest')
const app = require('../../app').app

it('status', function(done) {
    request(app)
        .get('/api/status')
        .expect({ message: 'Hello!' })
        .end(done)
})
