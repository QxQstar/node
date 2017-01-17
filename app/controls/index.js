/**
 * Created by star on 2017/1/17.
 */

var modelMovie = require('./../models/movie.js');
exports.index = function(req,res){
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
};