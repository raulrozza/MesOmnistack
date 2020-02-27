const { Schema, model} = require('mongoose');

const Room = new Schema({
    name: {
        type: String,
        required: true,
    },
    questionList:{
        type: Array,
        required: true,
    },
    answerList: {
        type: Array,
        required: false,
        default: [],
    }
}, {});

module.exports = model('Room', Room);