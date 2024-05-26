//Schema for Creating Products
const mongoose = require('mongoose');

const Lesson = mongoose.model("Lesson", {
    moduleid:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    video_URL: {
        type: String,
        //for now false
        required: true,
    },
    videoHtmlEmbed: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
})

module.exports = Lesson;