const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const Note = require('../models/Note')
const auth = require('../middleware/auth')
const { runHttpHandler } = require('../utils/lifecicle')
const _pick = require('lodash/pick')

const router = Router()

//return list of notes or note by id
router.get(
    '/',
    auth,
    runHttpHandler(async req => {
        const { userId } = req.user
        const { id, limit = 5, offset = 0 } = req.params

        if (id) {
            const note = await Note.findOne({ _id: id })
            return { note }
        }

        const notes = await Note.find({ owner: userId })
            .skip(offset)
            .limit(limit)

        return { notes }
    }),
)
//create new note
router.post(
    '/',
    auth,
    runHttpHandler(async req => {
        const { userId } = req.user
        const { title, message, isPinned = false } = req.body
        if (!title && !message) {
            throw new Error('Empty note, please put title or/and message')
        }
        const note = new Note({ title, message, owner: userId, isPinned })
        await note.save()

        return { id: note.id }
    }),
)
//update note
router.put(
    '/',
    auth,
    [check('id').exists()],
    runHttpHandler(async req => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new Error('Incorrect input data')
        }
        const { userId } = req.user
        const { id, ...updateParams } = req.body
        const note = await Note.findOne({ _id: id })
        if (!note) {
            throw new Error('Note does not exist')
        }
        if (note.owner !== userId) {
            throw new Error('Access denied')
        }
        note.update(_pick(updateParams, ['title', 'message', 'isPinned']))
        await note.save()
        return { id: note.id }
    }),
)
//remove note
router.delete(
    '/',
    auth,
    [check('id').exists()],
    runHttpHandler(async req => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new Error('Incorrect input data')
        }
        const { userId } = req.user
        const { id } = req.body
        const note = await Note.findOne({ _id: id })
        if (!note) {
            throw new Error('Note does not exist')
        }
        if (note.owner !== userId) {
            throw new Error('Access denied')
        }
        await note.remove()
        return { id: note.id }
    }),
)

module.exports = { path: 'notes', router }
