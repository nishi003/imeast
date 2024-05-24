//Schema for User model

const mongoose = require('mongoose');

const Users = mongoose.model('Users', {
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    sex: {
        type: String,
        required: false,
    },
    birthday: {
        type: Date,
        required: false,
    },
    phoneNumber: {
        type: Number,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: false,
    },
    registeredCollege: {
        type: String,
        required: false,
    },
    licenseNumber: {
        type: String,
        required: false,
    },
    practiceLocation: {
        type: String,
        required: false,
    },
    professionType: {
        type: String,
        required: false,
    },
    practicePeriod: {
        type: String,
        required: false,
    },
    other: {
        type: String,
        required: false,
    }
})

module.exports = Users;