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
    app.get('/admin/list',Movie.list);
    //后台录入页
    app.get('/admin/movie',Movie.new);
    //更新
    app.get('/admin/updata/:id',Movie.update);
    //保存
    app.post('/admin/movie/new',Movie.save);
    //删除电影
    app.delete('/admin/list',Movie.del);


    //用户列表页
    app.get('/admin/userlist',User.list);
    //注册
    app.post('/user/signup',User.signup);
    //登录
    app.post('/user/signin',User.signin);
    //登出
    app.get('/admin/logout',User.logout);
};
