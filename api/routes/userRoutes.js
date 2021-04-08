'use strict';

module.exports = function(app) {
    var user = require('../controllers/userController');

    // User Routes
    app.route('/user')
        .get(user.getAllUsers);

    app.route('/user/create')
        .post(user.createUser);

    app.route('/user/:userId')
        .get(user.getUser)
        .put(user.updateUser)
        .delete(user.deleteUser);
}