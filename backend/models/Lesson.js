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
        videoURL: {
            type: String,
            required: true,
        },
        videoHTMLEmbed: {
            type: String,
            required: true,
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