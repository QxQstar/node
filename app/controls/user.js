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
//注册Post
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
                    res.redirect('/');
                }
            });
        }else{
            return  res.redirect('/signin');
        }
    });
};
//登录Post
exports.signin = function(req,res){
    var _user = req.body;
    var name = _user.name;
    var password = _user.password;
    modelUser.findOne({
        name:name
    },function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/signup');
        }else{
            modelUser.findOne({
                name:name,
                password:password
            },function(err,user){
                if(err){
                    console.log(err);
                }
                if(user){

                    req.session.user = user;
                    res.redirect('/');
                }else{
                    res.redirect('/signin');
                }
            });
        }
    });
};
//显示登录表单
exports.showSignin = function(req,res){
    res.render('signin',{
        user:req.session.user
    });
};
//显示显示表单
exports.showSignup = function(req,res){
    res.render('signup',{
        user:req.session.user
    });
};
//登出
exports.logout = function(req,res){
    delete req.session.user;
    res.redirect('/');
};
//判断登录
exports.signinRequired = function(req,res,next){
    if(req.session.user){
        next()
    }else{
        res.redirect('/signin');
    }
};
//判断权限
exports.adminRequired = function(req,res,next){
    if(req.session.user.role > 10){
        next()
    }else{
        res.redirect('/signin');
    }
};