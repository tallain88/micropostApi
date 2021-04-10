'use strict';

module.exports = function (app) {

    var post = require('../controllers/postController');

    // Post routes
    app.route('/post')
        .get(post.getAllPosts);
    
    app.route('/post/create')
        .post(post.createPost);

    app.route('/post/user/:userId')
        .get(post.getAllUserPosts);

    app.route('/post/:postId')
        .put(post.updateSinglePost)
        .delete(post.deleteSinglePost);

    app.route('/post/:postId/')
        .get(post.getSinglePost);
}