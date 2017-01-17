/**
 * Created by star on 2017/1/17.
 */
var modelUser = require('./../models/user.js');
//用户列表页
exports.list = function(req,res){
    modelUser.fetch(function(err,list){
        if(err){
            console.log(err);
        }
        res.render('userlist',{
            title:'用户列表',
            user:req.session.user,
            list:list
        });
    });
};
//注册
exports.signup = function(req,res){
    var _user = req.body;
    modelUser.findOne({name:_user.name},function(err,userdoc){
        if(err){
            console.log(err);
        }
        if(!userdoc){
            var user = new modelUser({
                "name":_user.name,
                "password":_user.password
            });
            user.save(function(err,user){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/admin/userlist');
                }
            });
        }else{
            return  res.redirect('/');
        }
    });
};
//登录
exports.signin = function(req,res){
    var _user = req.body;
    var name = _user.name;
    var password = _user.password;
    modelUser.findOne({
        name:name,
        password:password
    },function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/');
        }else{
            req.session.user = user.name;
            res.redirect('/');
        }
    });
};
//登出
exports.logout = function(req,res){
    delete req.session.user;
    res.redirect('/');
};