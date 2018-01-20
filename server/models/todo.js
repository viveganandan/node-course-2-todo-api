const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        unique: true,
        minLength: 1,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};
