'use strict'; // no undeclared vars

var mongoose = require('mongoose'); //mongo
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    userName: {
        type: String,
        required: 'Enter your username'
    },
    password: {
        type: String,
        required: 'Enter a password'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Users', UserSchema);

