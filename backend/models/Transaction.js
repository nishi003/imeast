//Schema for Module model

const mongoose = require('mongoose');

const Transaction = mongoose.model('Transaction', {
    username: {
        type: String,
        required: true,
    },
    moduleID: {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    reason: {
        type: String,
        required: true,
    },
})

module.exports = Transaction;