/**
 * Created by star on 2017/2/9.
 */
var _ = require('underscore');
var modelCatetory = require('./../models/catetory.js');

//电影分类列表页
exports.list = function(req,res){

    modelCatetory.fetch(function(err,list){
        if(err){
            console.log(err);
        }
        res.render('catetoryList',{
            title:'电影分类列表页',
            user:req.session.user,
            list:list
        });
    });
};
//后台录入页
exports.new  = function (req, res) {
    res.render('catetoryAdmin',{
        title:'电影分类录入页',
        user:req.session.user,
        catetory:{
            name:""
        }

    })
};

//保存
exports.save = function(req,res){
    var id  = req.body._id;
    var catetoryObj = req.body;
    var _catetory;
    _catetory = new modelCatetory({
        name:catetoryObj.name
    });
    _catetory.save(function(err,catetory){
        if(!err){
            res.redirect('/admin/catetory/list');
        }
    });
};
//删除
exports.del = function(req,res){
    var id = req.query.id;
    if(id){
        modelCatetory.remove({
            _id:id
        },function(err,catetory){
            if(err){
                console.log(err);
            }else{
                res.json({status:1});
            }

        });
    }
};
