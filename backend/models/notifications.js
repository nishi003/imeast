const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now },
    type: { type: String, required: true },
    readStatus: { type: String, default: 'unread' }, //read, unread
    link: { type: String }
});

const Notification = mongoose.model('notifications', notificationSchema);

module.exports = Notification;
