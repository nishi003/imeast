//Schema for Creating Products
const mongoose = require('mongoose');

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    //thumbnail
    image: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: false,
    },
    video_embed_link: {
        type: String,
        //for now false
        required: false,
    },
    date:{
        type: Date,
        default: Date.now,
    },

})