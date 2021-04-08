'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts');

exports.getAllPosts = function(req, res) {
    Post.find({}, function (err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.createPost = function(req, res) {
    var newPost = new Post(req.body);
    newPost.save(function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.getAllUserPosts = function(req, res) {
    Post.findMany({userId: req.params.userId}, function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.getSinglePost = function(req, res) {
    Post.find({$and: [{_id: req.params.postId}, {userId: req.params.userId}]}, function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.deleteSinglePost = function(req, res) {
    Post.remove({_id: req.params.postId}, function(err, post) {
        if (err)
            res.send(err);
        res.json({message: 'Post delete success'});
    });
};

exports.updateSinglePost = function(req, res) {
    Post.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true}, function(err, post) {
        if (err)
            send(err);
        res.json(post);
    })
};

