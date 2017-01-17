/**
 * Created by star on 2017/1/5.
 */
var mongoose = require('mongoose');
var schemaMovie = require('./../schemas/movie.js');
var modelMovie = mongoose.model('movie',schemaMovie);
module.exports = modelMovie;