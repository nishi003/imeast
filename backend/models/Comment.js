const mongoose = require('mongoose');

//dot env for database access
const dotenv = require("dotenv");
dotenv.config();

//connect mongoose
const mongoosekey = process.env.MONGOOSE_CONNECT
//console.log(mongoosekey)
mongoose.connect(mongoosekey);


const commentSchema = new mongoose.Schema({
    CommentID: {type: Number, required: true, unique: true},
    ProductID: {type: Number, required: true},
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    parentCommentId: { type: Number, default: null },
    status: { type: String, default: 'unread' }, //read, unread
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
