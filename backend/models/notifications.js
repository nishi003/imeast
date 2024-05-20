const mongoose = require('mongoose');

//my own test database
mongoose.connect("mongodb+srv://basnetsan25:InnWSc0E6O7SG3m6@cluster0.4vviipo.mongodb.net/");


const notificationSchema = new mongoose.Schema({
    Username: {type: Number, required: true, unique: true},
    Type: {type: String, required: true},
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'unread' }, //read, unread
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
