/**
 * Created by star on 2017/2/7.
 */
var mongoose = require('mongoose');
var schemaComment = require('./../schemas/comment.js');
var modelComment = mongoose.model('comment',schemaComment);
module.exports = modelComment;