const mongoose = require('mongoose');

//my own test database
mongoose.connect("mongodb+srv://basnetsan25:InnWSc0E6O7SG3m6@cluster0.4vviipo.mongodb.net/");


const notificationSchema = new mongoose.Schema({
    username: {type: String, required: true},
    timeStamp: { type: Date, default: Date.now },
    type: {type: String, required: true},
    readStatus: { type: String, default: 'unread' }, //read, unread
    link: {type: String}
});

const Notification = mongoose.model('notifications', notificationSchema);

module.exports = Notification;
