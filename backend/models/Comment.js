const mongoose = require('mongoose');

//my own test database
mongoose.connect("mongodb+srv://basnetsan25:InnWSc0E6O7SG3m6@cluster0.4vviipo.mongodb.net/");


const commentSchema = new mongoose.Schema({
    CommentID: {type: Number, required: true, unique: true},
    ProductID: {type: Number, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    status: { type: String, default: 'unread' }, //read, unread
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
