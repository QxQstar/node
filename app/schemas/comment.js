/**
 * Created by star on 2017/2/7.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = Schema.Types.ObjectId;
var schemaComment = new Schema({
    movie:{
        type:objectId,
        ref:'movie'
    },
    from:{
        type:objectId,
        ref:'user'
    },
    reply:[{
        from:{
            type:objectId,
            ref:'user'
        },
        to:{
            type:objectId,
            ref:'user'
        },
        content:String
    }],

    content:String,
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
schemaComment.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
});
schemaComment.statics = {
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
module.exports = schemaComment;
