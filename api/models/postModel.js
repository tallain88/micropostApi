'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
        required: 'Enter a post title'

    },
    body: {
        type: String,
        required: 'Enter post content'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Posts', PostSchema);
