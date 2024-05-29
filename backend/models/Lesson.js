const mongoose = require('mongoose');

const Lesson = mongoose.model("Lesson",
    {
        moduleID: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        videoURL: {
            type: String,
            required: false,
        },
        thumbnail: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }
);

module.exports = Lesson;