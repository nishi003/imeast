//Schema for User model

const mongoose = require('mongoose');

const Users = mongoose.model('Users', {
    first_name: {
        type: String
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    sex: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    phoneNumber: {
        type: Number,
    },
    google: {
        type: Boolean,
        default: false
    },
    googleid: {
        type: Number,
    },
    pw1: {
        type: String,
    },
    pw2: {
        type: String,
    },
    password: {
        type: String,
    },
    cart: {
        type: Object
    },
    modulesBought: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now,
    },
    admin: {
        type: Boolean,
        default: false
    },
    registeredCollege: {
        type: String,
    },
    lisenceNumber: {
        type: Number,
    },
    practiceLocation: {
        type: String,
    },
    professionType: {
        type: String,
    },
    practicePeriod: {
        type: Number,
    },
    Other: {
        type: String
    }
})

module.exports = Users;
