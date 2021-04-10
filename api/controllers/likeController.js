'use strict';

var mongoose = require('mongoose'),
    Like = mongoose.model('Likes');

exports.getAllLikes = function(req, res) {
    Like.find({}, function (err, like) {
        if (err)
            res.send(err);
        res.json(like);
    });
};

exports.createLike = function(req, res) {
    var newLike = new Like(req.body);
    newLike.save(function(err, like) {
        if (err)
            res.send(err);
        res.json(like);
    });
};

exports.getAllPostLikes = function(req, res) {
    Like.find({postId: req.params.postId}, function(err, like) {
        if (err)
            res.send(err);
        res.json(like);
    });
};

exports.getAllUserLikes = function(req, res) {
    Like.find({userId: req.params.userId}, function(err, like) {
        if (err)
            res.send(err);
        res.json(like);
    });
};

exports.getSingleUserPostLike = function(req, res) {
    Like.find({$and: [{userId: req.params.userId}, {postId: req.params.postId}]}, function(err, like) {
        if (err)
            res.send(err);
        res.json(like);
    });
};


exports.deleteSingleLike = function(req, res) {
    Like.deleteOne({_id: req.params.likeId}, function(err, like) {
        if (err)
            res.send(err);
        res.json({message: 'Like delete success'});
    });
};

