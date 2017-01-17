/**
 * Created by star on 2017/1/11.
 */
var mongoose = require('mongoose');
var schemaUser = require('./../schemas/user.js');
var modelUser = mongoose.model('user',schemaUser);
module.exports = modelUser;