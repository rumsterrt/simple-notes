const { Router } = require('express')

const router = Router()

// /status
router.get('/', async (req, res) => {
    try {
        return res.status(201).json({ message: 'Hello!' })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
})

module.exports = { router, path: 'status' }
