const { Schema, model } = require('mongoose')
const User = require('./User')

const schema = new Schema({
    owner: { type: User, required: true },
    title: { type: String },
    text: { type: String },
    isPinned: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
})

module.exports = model('User', schema)
