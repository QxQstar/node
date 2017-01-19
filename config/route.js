/**
 * Created by star on 2017/1/15.
 */
var Index = require('./../app/controls/index.js');
var User = require('./../app/controls/user.js');
var Movie = require('./../app/controls/movie.js');
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
};
