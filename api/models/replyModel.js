'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReplySchema = new Schema({
    postId: {
        type: String,
    },
    userId: {
        type: String,
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Replies', ReplySchema);
