/**
 * Created by star on 2017/1/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var schemaMovie = new Schema({
    title:String,
    director:String,
    country:String,
    language:String,
    year:Number,
    poster:String,
    flash:String,
    summary:String,
    pv:{
        type:Number,
        default:0
    },
    catetory:{
        type:ObjectId,
        ref:'catetory'
    },
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
schemaMovie.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
});
schemaMovie.statics = {
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
module.exports = schemaMovie;