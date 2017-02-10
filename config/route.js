/**
 * Created by star on 2017/1/15.
 */
var Index = require('./../app/controls/index.js');
var User = require('./../app/controls/user.js');
var Movie = require('./../app/controls/movie.js');
var Comment = require('./../app/controls/comment.js');
var Catetory = require('./../app/controls/catetory.js');
module.exports = function(app){
    //首页
    app.get('/',Index.index);


    //详情页
    app.get('/movie/:id',Movie.detail);
    //后台列表页
    app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list);
    //后台录入页
    app.get('/admin/movie',User.signinRequired,User.adminRequired,Movie.new);
    //更新
    app.get('/admin/movie/updata/:id',User.signinRequired,User.adminRequired,Movie.update);
    //保存
    app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.save);
    //删除电影
    app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del);


    //用户列表页
    app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list);
    //注册
    app.get('/signup',User.showSignup);
    app.post('/user/signup',User.signup);
    //登录
    app.get('/signin',User.showSignin);
    app.post('/user/signin',User.signin);
    //登出
    app.get('/admin/logout',User.logout);

    //评价
    app.post('/user/comment',User.signinRequired,Comment.save);

    //电影分类录入页
    app.get('/admin/catetory/new',User.signinRequired,User.adminRequired,Catetory.new);
    //保存
    app.post('/admin/catetory',User.signinRequired,User.adminRequired,Catetory.save);
    //电影分类列表页
    app.get('/admin/catetory/list',User.signinRequired,User.adminRequired,Catetory.list);
    //电影分类删除
    app.delete('/admin/catetory/list',User.signinRequired,User.adminRequired,Catetory.del);

    //分类的电影列表
    app.get('/results',Index.search);
};
