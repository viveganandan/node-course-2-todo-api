const mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        unique: true,
        minLength: 1,
        trim: true,
        required: true
    }
});

module.exports = {User};
