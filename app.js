/**
 * Created by star on 2017/1/3.
 */
var express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var dbUrl = 'mongodb://localhost/imooc';
mongoose.connect(dbUrl);

var app = express();
app.locals.moment = require('moment');
app.set('views','app/views/pages');
app.set('view engine','pug');
app.use(express.static('public'));

app.use(session({
    'secret':'my app',
    'store':new mongoStore({
        url:dbUrl,
        collection:'session'
    })
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
if(app.get('env') === 'development'){
    app.set('showStackError',true);
    app.locals.pretty = true;
    app.use(morgan('dev'));
    mongoose.set('debug',true);
}
require('./config/route.js')(app);

app.listen(port,function(){
    console.log('start listen ' + port + ' port');
});


