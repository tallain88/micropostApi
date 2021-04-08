'use strict';

module.exports = function (app) {

    var post = require('../controllers/postController');

    // Post routes
    app.route('/post')
        .get(post.getAllPosts);
    
    app.route('/post/create')
        .post(post.createPost);

    app.route('/post/:userId')
        .get(post.getAllUserPosts);

    app.route('/post/:postId')
        .put(post.updateSinglePost)
        .delete(post.deleteSinglePost);

    app.route('/post/:userId/:postId')
        .get(post.getSinglePost);
}