var assert = require('assert');
var chai = require('chai')
var chaiHttp = require('chai-http');
var should = chai.should;
var expect = chai.expect;
var server = require('../server');
const User = require('../api/models/userModel');
const Post = require('../api/models/postModel');
const Reply = require('../api/models/replyModel');
const Like = require('../api/models/likeModel');
const UserController = require('../api/controllers/userController');
const PostController = require('../api/controllers/postController');
const ReplyController = require('../api/controllers/replyController');
const LikeController = require('../api/controllers/likeController');

chai.use(chaiHttp);

let testUser;
let testPost;
let testReply;
let testLike;

describe ('User Tests', function () {

    

    afterEach(function() {
        if (testUser != null) {
            User.deleteMany({})
            .then(function(){
                done();
            })
        }
        
    })

    describe('User Controller Tests', function() {
        afterEach(function() {
            if (testUser != null) {
                User.deleteOne(testUser)
                .then(function(){
                    done();
                })
            }
            
        });

        beforeEach(function() {
                testUser = new User({userName: 'Alberto', password: 'password'});
                testUser.save()
                .then(() => {
                    done();
                })
            })

        describe('/GET All Users', function () {
            it('Get Users', function (done) {
                chai.request(server)
                .get('/user')
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                })
                
            });
        });

        describe('/GET User', function () {
            it('Get User', function (done) {
                chai.request(server)
                .get('/user/' + testUser.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id')
                    done();
                })
                
            });
        });

        describe('/POST Create User', function () {
            it('Create User', function (done) {
                testUser = {userName: 'potatoPancakeExtreme', password:'coolCucumber'};
                chai.request(server)
                .post('/user/create')
                .send(testUser)
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res.body).to.have.property('userName');
                    expect(res.body).to.have.property('password');
                    expect(res).to.have.status(200);
                    User.deleteOne(res.body._id);
                    done();
                })
                
            });
        });

        describe('/PUT User', function () {
        

            it('Update User', function(done) {
                chai.request(server)
                .put('/user/' + testUser.id)
                .send({userName: 'Hector', password : 'potatoes'})
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('userName').to.equal('Hector')
                    expect(res.body).to.have.property('password').to.equal('potatoes')
                    done();

                })
            });
        });
        describe('/DELETE User', function () {


            it('Delete User', function(done) {
                chai.request(server)
                .delete('/user/' + testUser.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal('User delete success')
                    done();
                });
            });
        });
    });

});

describe ('Post Tests', function () {

    afterEach(function() {
        if (testUser != null) {
            User.deleteMany(testUser)
            .then(function(){
                done();
            })
        }

        
    });

    afterEach(function() {
        if (testPost != null) {
            Post.deleteMany({userId: testUser.id})
            .then(function(){
                done();
            })
        }
        
    });

    describe('Post Controller Tests', function(){

        beforeEach(function() {
            testUser = new User({userName: 'Alberto', password: 'password'});
            testUser.save()
            .then(() => {
                done();
            })
            
        });

        beforeEach(function() {
            testPost = new Post({userId: testUser.id, title: 'test title', body: 'test body'});
            testPost.save()
            .then(() => {
                done();
            })
            
        });

        describe('/GET All Posts', function () {
            it('Get All', function (done) {
                chai.request(server)
                .get('/post')
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                })
                
            });
            it('Get All User Posts', function (done) {
                chai.request(server)
                .get('/post/user/' + testUser.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                })
                
            });
        });
        
        describe('/GET Single Post', function () {
            it('Get post', function (done) {
                chai.request(server)
                .get('/post/' + testPost.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id').equal(testPost.id);
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('body');
                    expect(res.body).to.have.property('title');
                    done();
                })
                
            });
        });
        describe('/POST Create Post', function () {
            
            it('Create post', function (done) {
                testPost = {userId: testUser.id, title: 'test title', body: 'test body', replies:[]};
                chai.request(server)
                .post('/post/create')
                .send(testPost)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('body');
                    expect(res.body).to.have.property('title');
                    done();
                })
                
            });
        });
        describe('/PUT Update Post', function() {
            it('Update post', function(done){
                chai.request(server)
                .put('/post/' + testPost.id)
                .send({title: 'Exciting news!', body : 'This testing suite is nice!'})
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('title').to.equal('Exciting news!')
                    expect(res.body).to.have.property('body').to.equal('This testing suite is nice!')
                    testPost = res.body;
                    done();

                })
            });
            
        });

        describe('/DELETE Delete Post', function() {
            it('Update post', function(done){
                chai.request(server)
                .delete('/post/' + testPost.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal('Post delete success')
                    done();

                })
            });
            
        });
    });


});

describe ('Reply Tests', function () {

    afterEach(function() {
        if (testUser != null) {
            User.deleteMany(testUser)
            .then(function(){
                done();
            })
        }

        
    });

    afterEach(function() {
        if (testPost != null) {
            Post.deleteMany({userId: testUser.id})
            .then(function(){
                done();
            })
        }
        
    });

    afterEach(function() {
        if (testReply != null) {
            Reply.deleteMany({postId: testPost.id})
            .then(function(){
                done();
            })
        }
        
    });

    describe('Reply Controller Tests', function(){

        beforeEach(function() {
            testUser = new User({userName: 'Alberto', password: 'password'});
            testUser.save()
            .then(() => {
                done();
            })
            
        });

        beforeEach(function() {
            testPost = new Post({userId: testUser.id, title: 'test title', body: 'test body', replies:[]});
            testPost.save()
            .then(() => {
                done();
            })
            
        });

        beforeEach(function() {
            testReply = new Reply({userId: testUser.id, postId: testPost.id, body: 'test body'});
            testReply.save()
            .then(() => {
                done();
            })
            
        });

        describe('/GET All Replies', function () {
            
            it('Get Replies', function (done) {
                chai.request(server)
                .get('/reply')
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                })
                
            });
        });
        describe('/GET Single Reply', function () {
            
            it('Get Reply', function (done) {
                chai.request(server)
                .get('/reply/' + testReply.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('postId');
                    expect(res.body).to.have.property('body');
                    done();
                })
                
            });
            it('Get Single Post Reply', function (done) {
                chai.request(server)
                .get('/reply/' + testReply.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('postId');
                    expect(res.body).to.have.property('body');
                    done();
                })
                
            });
        });

        describe('/POST Create Reply', function () {
            
            it('Create Reply', function (done) {
                testReply = {userId: testUser.id, postId: testPost.id, body: 'test body'};
                chai.request(server)
                .post('/reply/create')
                .send(testReply)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('postId');
                    expect(res.body).to.have.property('body');
                    done();
                })
                
            });
        });
        describe('/PUT Update Reply', function() {
            it('Update Reply', function(done){
                chai.request(server)
                .put('/reply/' + testReply.id)
                .send({body: 'Edit: I made a mistake before'})
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('postId');
                    expect(res.body).to.have.property('body').to.equal('Edit: I made a mistake before')
                    testReply = res.body;
                    done();

                })
            });
            
        });

        describe('/DELETE Delete Reply', function() {
            it('Update post', function(done){
                chai.request(server)
                .delete('/reply/' + testReply.id)
                .send({title: 'Exciting news!', body : 'This testing suite is nice!'})
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal('Reply delete success')
                    done();

                })
            });
            
        });
    });
});


describe ('Like Tests', function () {

    

    afterEach(function() {
        if (testUser != null) {
            User.deleteMany(testUser)
            .then(function(){
                done();
            })
        }

        
    });

    afterEach(function() {
        if (testPost != null) {
            Post.deleteMany({userId: testUser.id})
            .then(function(){
                done();
            })
        }
        
    });

    afterEach(function() {
        if (testReply != null) {
            Reply.deleteMany({postId: testPost.id})
            .then(function(){
                done();
            })
        }
        
    });

    afterEach(function() {
        if (testLike != null) {
            Like.deleteMany({postId: testPost.id})
            .then(function(){
                done();
            })
        }
        
    });

    describe('Like Controller Tests', function(){

        beforeEach(function() {
            testUser = new User({userName: 'Alberto', password: 'password'});
            testUser.save()
            .then(() => {
                done();
            })
            
        });

        beforeEach(function() {
            testPost = new Post({userId: testUser.id, title: 'test title', body: 'test body', replies:[]});
            testPost.save()
            .then(() => {
                done();
            })
            
        });

        beforeEach(function() {
            testReply = new Reply({userId: testUser.id, postId: testPost.id, body: 'test body'});
            testReply.save()
            .then(() => {
                done();
            })
            
        });

        beforeEach(function() {
            testLike = new Reply({userId: testUser.id, postId: testPost.id});
            testLike.save()
            .then(() => {
                done();
            })
            
        });

        describe('/GET All Likes', function () {
            
            it('Get Likes', function (done) {
                chai.request(server)
                .get('/like')
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                })
                
            });

            it('Get Post Likes', function (done) {
                chai.request(server)
                .get('/like/post/' + testPost.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                })
                
            });

            it('Get User Likes', function (done) {
                chai.request(server)
                .get('/like/user/' + testUser.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                })
                
            });

        });

        describe('/GET Single User Post Like', function () {
            
            it('Get Single Post Like', function (done) {
                chai.request(server)
                .get('/like/' + testReply.id + '/' + testUser.id)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                })
                
            });
        });

        describe('/POST Create Like', function () {
            
            it('Create Like', function (done) {
                testReply = {userId: testUser.id, postId: testPost.id};
                chai.request(server)
                .post('/like/create')
                .send(testReply)
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('postId');
                    done();
                })
                
            });
        });

        describe('/DELETE Delete Like', function() {
            it('Update post', function(done){
                chai.request(server)
                .delete('/like/' + testLike.id)
                .send({title: 'Exciting news!', body : 'This testing suite is nice!'})
                .end((err, res) => {
                    expect(res.body).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal('Like delete success')
                    done();

                })
            });
            
        });
    });

});







