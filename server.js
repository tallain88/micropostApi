var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'),
    Post = require('./api/models/postModel'),
    Reply = require('./api/models/replyModel'),
    Like = require('./api/models/likeModel'),
    bodyParser = require('body-parser');

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/MicropostDB', {
    useNewUrlParser:true, useUnifiedTopology: true
    })
    // .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection error: ", err ));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routing
var userRoutes = require('./api/routes/userRoutes');
var postRoutes = require('./api/routes/postRoutes');
var replyRoutes = require('./api/routes/replyRoutes');
var likeRoutes = require('./api/routes/likeRoutes');

// Register routes
userRoutes(app);
postRoutes(app);
replyRoutes(app);
likeRoutes(app);

// 404 middleware for 'not found' errors
app.use(function(req, res) {
    res.status(404).send({url: '\'' + req.originalUrl + '\'' + ' not found'})
});

app.listen(port);

console.log('Micropost API now listening on: ' + port);

module.exports = app;