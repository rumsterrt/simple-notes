const _get = require('lodash/get')
const jwt = require('jsonwebtoken')
const config = require('config')
const { failure } = require('../utils/lifecicle')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = _get(req, 'headers.authorization').split(' ')[1]

        if (!token) {
            throw new Error()
        }
        const decoded = jwt.verify(token, config.get('jwt_secret'))
        req.user = decoded
        next()
    } catch (error) {
        failure(res, error, 401)
    }
}
