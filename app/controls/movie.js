/**
 * Created by star on 2017/1/17.
 */
var _ = require('underscore');
var modelMovie = require('./../models/movie.js');
//详情页
exports.detail = function(req,res){
    var id = req.params.id;
    modelMovie.findById(id,function(err,movie){
        res.render('detail',{
            title:'详情页',
            user:req.session.user,
            movie:movie
        });
    });
};
//后台列表页
exports.list = function(req,res){
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
};
//后台录入页
exports.new  = function (req, res) {
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
};
//更新
exports.update = function(req,res){
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
};
//保存
exports.save = function(req,res){
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
};
//删除电影
exports.del = function(req,res){
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
};