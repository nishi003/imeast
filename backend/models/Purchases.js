//Schema for Module model

const mongoose = require('mongoose');

const Purchases = mongoose.model('Purchases', {
    userID: {
        type: String,
        required: true,
    },
    moduleID: {
        type: String,
        required: true,
    },
})

module.exports = Purchases;