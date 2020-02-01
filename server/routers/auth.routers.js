const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { runHttpHandler } = require('../utils/lifecicle')

const router = Router()

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Incorrect email')
            .normalizeEmail()
            .isEmail(),
        check('password', 'Input password').exists(),
    ],
    runHttpHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new Error('Incorrect input data')
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('User with this email does not exist')
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            throw new Error('Incorrect password')
        }

        const token = jwt.sign({ userId: user.id }, config.get('jwt_secret'), {
            expiresIn: config.get('jwt_lifetime') || '1h',
        })

        return { token, userId: user.id }
    }),
)

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password')
            .isLength({ min: 5 })
            .exists(),
    ],
    runHttpHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new Error('Incorrect input data')
        }

        const { email, password } = req.body

        const isExist = await User.findOne({ email })

        if (isExist) {
            throw new Error('User with this email already exist')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        return { message: 'User created' }
    }),
)

module.exports = { router, path: 'auth' }
