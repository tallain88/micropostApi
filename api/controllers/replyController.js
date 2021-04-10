'use strict';

var mongoose = require('mongoose'),
    Reply = mongoose.model('Replies');

exports.getAllReplies = function(req, res) {
    Reply.find({}, function (err, reply) {
        if (err)
            res.send(err);
        res.json(reply);
    });
};

exports.createReply = function(req, res) {
    var newReply = new Reply(req.body);
    newReply.save(function(err, reply) {
        if (err)
            res.send(err);
        res.json(reply);
    });
};

exports.getAllPostReplys = function(req, res) {
    Reply.findMany({userId: req.params.postId}, function(err, reply) {
        if (err)
            res.send(err);
        res.json(reply);
    });
};

exports.getSingleReply = function(req, res) {
    Reply.findById({_id: req.params.replyId}, function(err, reply) {
        if (err)
            res.send(err);
        res.json(reply);
    });
};

exports.deleteSingleReply = function(req, res) {
    Reply.deleteOne({_id: req.params.replyId}, function(err, reply) {
        if (err)
            res.send(err);
        res.json({message: 'Reply delete success'});
    });
};

exports.updateSingleReply = function(req, res) {
    Reply.findOneAndUpdate({_id: req.params.replyId}, req.body, {new: true}, function(err, reply) {
        if (err)
            send(err);
        res.json(reply);
    })
};

