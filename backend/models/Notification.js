const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
            required: false,
        },
        read: {
            type: Boolean,
            default: false,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        typeID: {
            type: Number,
            required: true,
        }
    }
);

const Notification = mongoose.model('notifications', notificationSchema);

module.exports = Notification;
