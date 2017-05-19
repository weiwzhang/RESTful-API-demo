/*RESTful API demo
DISREGARD! an experimental client server
 --- @author Weiwei Zhang*/


var restify = require('restify');
var server = require('./server');
var Time = require('./models/time')   //acquire Model
 
var client = restify.createJsonClient({
    url: 'http://localhost:3000'
});
 
// a static product to CREATE READ UPDATE DELETE
 
var test_time = new Time({utc: '00:00'});

/*CRUD*/
 
/*SET*/
client.post('/time', test_time, function (err, req, res, time) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product saved >>>>>>>');
        console.log(time);
    }
});

/*GET*/
client.get('/time/' + test_time.id, function (err, req, res, time) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('time with id ' + time.id + '  >>>>>>>');
        console.log(time);
    }
});

/*DELETE*/
client.del('/time/' + test_time.id, function (err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product deleted >>>>>>>');
        console.log(status);
    }
});
