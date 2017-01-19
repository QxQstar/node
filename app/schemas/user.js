/**
 * Created by star on 2017/1/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaUser = new Schema({
    name:{
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:Number,
        default:0
    },
    //普通用户:0
    //邮箱激活用户:1
    //信息完备用户:2
    //管理员：>10
    //超级管理员：>50
    meta:{
        createAt:{
            type:Date,
            default: Date.now()
        },
        updateAt:{
            type:Date,
            default: Date.now()
        }
    }
});
schemaUser.pre('save',function(next){
    var user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    //bcrypt.genSalt(10,function(err,salt){
    //    if(err){
    //        return next(err);
    //    }
    //    bcrypt.hash(user.password,salt,function(err,hash){
    //        if(err){
    //            return next(err);
    //        }
    //        user.password = hash;
    //        next();
    //    });
    //});
    next();
});
schemaUser.statics = {
    fetch:function(cd){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cd)
    },
    findById:function(id,cd){
        return this
            .findOne({_id:id})
            .exec(cd);
    }
};
module.exports = schemaUser;