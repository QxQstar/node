/**
 * Created by star on 2017/2/9.
 */
var mongoose = require('mongoose');
var schemaCatetory = require('./../schemas/catetory.js');
var modelCatetory = mongoose.model('catetory',schemaCatetory);
module.exports = modelCatetory;