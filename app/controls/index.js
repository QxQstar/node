/**
 * Created by star on 2017/1/17.
 */

var modelMovie = require('./../models/movie.js');
var modelCatetory = require('./../models/catetory.js');
exports.index = function(req,res){
    modelCatetory
        .find({})
        .populate({path:'movies',options:{limit:5}})
        .exec(function(err,catetories){
            if(err){
                console.log(err);
            }
            res.render('index',{
                title:'科技小站首页',
                user:req.session.user,
                catetories:catetories
            });

        });

};