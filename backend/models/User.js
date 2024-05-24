const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
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
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;