//Schema for User model

const mongoose = require('mongoose');

const Users = mongoose.model('Users', {
    first_name: {
        type: String
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    sex: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    google: {
        type: Boolean,
        default: false
    },
    googleid:{
        type: Number,
    },
    pw1: {
        type: String,
    }, 
    pw2: {
        type: String,
    },
    password:{
        type: String,
    },
    cart:{
        type: Object
    },
    modulesBought:{
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
        required: false
    },
    lisenceNumber: {
        type: Number,
        required: false
    },
    practiceLocation: {
        type: String,
        required: false
    },
    professionType: {
        type: String,
        required: false
    },
    practicePeriod: {
        type: Number,
        required: false
    },
    Other:{
        type: String
    }
})

module.exports = Users;
