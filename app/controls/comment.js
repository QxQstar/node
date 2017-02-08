/**
 * Created by star on 2017/2/7.
 */
var modelComment = require('./../models/comment.js');
//��������
exports.save = function(req,res,next){
    var movieId = req.body.movie;
    //Ƕ������
    if(req.body.cid){
        var reply = {
            from:req.session.user._id,
            to:req.body.tid,
            content:req.body.content
        };
        modelComment.findById(req.body.cid,function(err,comment){
            comment.reply.push(reply);
            comment.save(function(err,comment){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/'+movieId);
            });
        });
    }else{//������
        var comment = new modelComment({
            from:req.session.user._id,
            movie:movieId,
            content:req.body.content
        });
        comment.save(function(err,comment){
            if(err){
                console.log(err);
            }
            res.redirect('/movie/'+movieId);
        });
    }

};