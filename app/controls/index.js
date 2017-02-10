/**
 * Created by star on 2017/1/17.
 */

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
exports.search = function(req,res){
    var catId = req.query.cat;
    var page = req.query.p;
    //每一页只展示两条数据
    var limit = 2;
    var index = page * limit;


    modelCatetory
        .find({_id:catId})
        .populate({
            path:'movies'
        })
        .exec(function(err,catetories){
            if(err){
                console.log(err);
            }
            var catetory = catetories[0] || {};
            var movies = catetory.movies || [];
            var results = movies.slice(index,index + limit);
            res.render('result',{
                title:'结果列表',
                keyword:catetory.name,
                user:req.session.user,
                currPage:(page|0) + 1,
                totalPage:Math.ceil( movies.length/limit ),
                movies:results,
                catId:catId
            });

        });
};