const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        lessonID: {
            type: Number,
            required: true,
        },
        userID:
        {
            type: Number,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        content:
        {
            type: String,
            required: true,
        },
        timestamp:
        {
            type: Date,
            default: Date.now,
            required: false,
        },
        parentCommentID:
        {
            type: Number,
            required: false,
        },
    }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
