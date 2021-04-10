'use strict';

module.exports = function (app) {

    var like = require('../controllers/likeController');

    // Like routes
    app.route('/like')
        .get(like.getAllLikes);
    
    app.route('/like/create')
        .post(like.createLike);

    app.route('/like/user/:userId')
        .get(like.getAllUserLikes);
    
    app.route('/like/post/:postId')
        .get(like.getAllPostLikes);

    app.route('/like/:userId/:postId')
        .get(like.getSingleUserPostLike);

    app.route('/like/:likeId')
        .delete(like.deleteSingleLike);

}