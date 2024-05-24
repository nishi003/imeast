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
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    registeredCollege: {
        type: String,
        required: true,
    },
    licenseNumber: {
        type: String,
        required: true,
    },
    practiceLocation: {
        type: String,
        required: true,
    },
    professionType: {
        type: String,
        required: true,
    },
    practicePeriod: {
        type: String,
        required: true,
    },
    other: {
        type: String,
        required: false,
    }
})

module.exports = Users;
