var assert = require('assert');
var chai = require('chai')
var chaiHttp = require('chai-http');
var should = chai.should;
var expect = chai.expect;
var server = require('../server');
const User = require('../api/models/userModel');
const Post = require('../api/models/postModel');
const UserController = require('../api/controllers/userController');
const PostController = require('../api/controllers/postController');

chai.use(chaiHttp);

let testUser;
let testPost;

describe ('User Tests', function () {

    

    afterEach(function() {
        if (testUser != null) {
            User.remove({})
            .then(function(){
                done();
            })
        }
        
    })

    describe('User Controller Tests', function() {
        afterEach(function() {
            if (testUser != null) {
                User.remove(testUser)
                .then(function(){
                    done();
                })
            }
            
        })
        beforeEach(function() {
                testUser = new User({userName: 'Alberto', password: 'password'});
                testUser.save()
                .then(() => {
                    done();
                })
            })
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
                    User.remove(res.body._id);
                    done();
                })
                
            });
        });

        describe('/GET All Users', function () {
            it('Create User', function (done) {
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
            User.remove(testUser)
            .then(function(){
                done();
            })
        }

        
    });

    afterEach(function() {
        if (testPost != null) {
            Post.remove(testPost)
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
            testPost = new Post({userId: testUser.id, title: 'test title', body: 'test body', replies:[]});
            testPost.save()
            .then(() => {
                done();
            })
            
        });

        describe('/GET All Posts', function () {
            it('Get posts', function (done) {
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
                    done();

                })
            });
            
        });
    });


});





