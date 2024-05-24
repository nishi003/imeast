//Schema for Module model

const mongoose = require('mongoose');

const Modules = mongoose.model('Modules', {
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pdf: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    link: {
        type: String,
        required: false,
    },
})

module.exports = Module;