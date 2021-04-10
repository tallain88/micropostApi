'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
    postId: {
        type: String,

    },
    userId: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Likes', LikeSchema);
