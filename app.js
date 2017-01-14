/**
 * Created by star on 2017/1/3.
 */
var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var modelMovie = require('./models/movie.js');
var modelUser = require('./models/user.js');
var dbUrl = 'mongodb://localhost/imooc';
mongoose.connect(dbUrl);
var app = express();
app.locals.moment = require('moment');
app.set('views','views/pages');
app.set('view engine','pug');
app.use(express.static('public'));
app.use(session({
    'secret':'my app',
    'store':new mongoStore({
        url:dbUrl,
        collection:'session'
    })
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(port,function(){
    console.log('start listen ' + port + ' port');
});

//首页
app.get('/',function(req,res){
    modelMovie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }
        res.render('index',{
            title:'科技小站首页',
            user:req.session.user,
            list:movies
        });
    });
});
//详情页
app.get('/movie/:id',function(req,res){
    var id = req.params.id;
    modelMovie.findById(id,function(err,movie){
        res.render('detail',{
            title:'详情页',
            user:req.session.user,
            movie:movie
        });
    });

});
//后台列表页
app.get('/admin/list',function(req,res){
    modelMovie.fetch(function(err,list){
        if(err){
            console.log(err);
        }
        res.render('list',{
            title:'后台录入页',
            user:req.session.user,
            list:list
        });
    });
});
//用户列表页
app.get('/admin/userlist',function(req,res){
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
});
//后台录入页
app.get('/admin/movie', function (req, res) {
    res.render('admin',{
        title:'后台录入页',
        user:req.session.user,
        movie:{
            title:"",
            doctor:"",
            country:"",
            language:"",
            year:'',
            poster:'',
            flash:'',
            summary:''
        }
    })
});
app.get('/admin/updata/:id',function(req,res){
    var id = req.params.id;
    if(id) {
        modelMovie.findById({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.render('admin',{
                movie:movie
            });
        });
    }
});
app.post('/admin/movie/new',function(req,res){
    var id  = req.body._id;
    var movieObj = req.body;
    var _movie;
    //如果该电影已经存储到数据库了，进行更新
    if(id !== ''){
        modelMovie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            _movie = _.extend(movie,movieObj);
            _movie.save(function(err,movie){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    }else{
        _movie = new modelMovie({
            "title":movieObj.title,
            "director":movieObj.director,
            "country":movieObj.country,
            "language":movieObj.language,
            "year":movieObj.year,
            "poster":movieObj.poster,
            "flash":movieObj.flash,
            "summary":movieObj.summary
        });
        _movie.save(function(err,movie){
            if(!err){
                res.redirect('/movie/' + movie._id);
            }
        });
    }
});
//删除电影
app.delete('/admin/list',function(req,res){
    var id = req.query.id;
    if(id){
        modelMovie.remove({
            _id:id
        },function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.json({status:1});
            }

        });
    }
});
//注册
app.post('/user/signup',function(req,res){
    var _user = req.body;
    modelUser.find({name:_user.name},function(err,userdoc){
        if(err){
            console.log(err);
        }
        if(userdoc){
          return  res.redirect('/');
        }else{
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
        }
    });

});
//登录
app.post('/user/signin',function(req,res){
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
});
//登出
app.get('/admin/logout',function(req,res){
    delete req.session.user;
    res.redirect('/');
});