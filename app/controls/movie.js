/**
 * Created by star on 2017/1/17.
 */
var _ = require('underscore');
var modelMovie = require('./../models/movie.js');
var modelCatetory = require('./../models/catetory.js');
var modelComment = require('./../models/comment.js');

//详情页
exports.detail = function(req,res){
    var id = req.params.id;
    modelMovie.update({_id:id},{$inc:{pv:1}},function(err){
        console.log(err);
    });
    modelMovie
        .findById(id,function(err,movie){
            modelCatetory
                .findById(movie.catetory,function(err,catetory){
                    var type = {
                        type:catetory.name
                    };
                    modelComment
                        .find({movie:id})
                        .populate('from','name')
                        .populate('reply.from reply.to','name')
                        .exec(function(err,comments){
                            res.render('detail',{
                                title:'详情页',
                                user:req.session.user,
                                movie: _.extend(movie,type),
                                comments:comments
                            });
                        });
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
            title:'后台电影列表页',
            user:req.session.user,
            list:list
        });
    });
};
//后台录入页
exports.new  = function (req, res) {
    modelCatetory.find({},function(err,catetories){
        if(err){
            console.log(err);
        }
        res.render('admin',{
            title:'后台录入页',
            user:req.session.user,
            catetories:catetories,
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
        });
    });

};
//更新
exports.update = function(req,res){
    var id = req.params.id;
    if(id) {

        modelMovie.findById({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            }
            modelCatetory.find({},function(err,catetories){
                res.render('admin',{
                    title:'更新',
                    movie:movie,
                    catetories:catetories
                });
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
    if(id){
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
        var catetoryId = movieObj.catetory;

        _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }
            if(catetoryId) {
                console.log('sss',catetoryId);
                movie.catetory = catetoryId;
                movie.save();
                modelCatetory.findById(catetoryId, function (err, catetory) {
                    if (err) {
                        console.log(err);
                    }
                    catetory.movies.push(movie._id);
                    catetory.save(function (err, catetory) {
                        if(err){
                            console.log(err);
                        }
                        res.redirect('/movie/' + movie._id);
                    });
                });
            }else if(movieObj.catetoryName){
                var catetory = new modelCatetory({
                    name:movieObj.catetoryName,
                    movies:[movie._id]
                });
                catetory.save(function (err, catetory) {
                    movie.catetory = catetory._id;
                    movie.save(function(err,movie){
                        if(err){
                            console.log(err);
                        }
                        res.redirect('/movie/' + movie._id);
                    });

                });

            }else{

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
