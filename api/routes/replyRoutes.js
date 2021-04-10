'use strict';

module.exports = function (app) {

    var reply = require('../controllers/replyController');

    // Reply routes
    app.route('/reply')
        .get(reply.getAllReplies);
    
    app.route('/reply/create')
        .post(reply.createReply);

    app.route('/reply/:replyId')
        .get(reply.getSingleReply)
        .put(reply.updateSingleReply)
        .delete(reply.deleteSingleReply);
}