/*RESTful API demo
support following CRUD operations: SET (create & update), GET, DELETE
 --- @author Weiwei Zhang*/

/**
 * Module Dependencies
 */
var config = require('./config');
var restify = require('restify');
var mongoose = require('mongoose');
var moment = require('moment-timezone');   // to convert timzone


/* Initialize Server */
global.server = restify.createServer();


/* Connect to Database */
mongoose.connect(config.db.uri);
var db = mongoose.connection;

var Time = require('./models/time');   //acquire Model


/* Middleware */
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


/* start the listener */
server.listen(config.port, function() {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});


/* CRUD */
server.post('/times/:Id/:utc', set);   // /time/set/<id>/<UTCtime>
server.get('/times/:Id/:zone', get);   // /time/get/<id>/<zone>
server.del('/times/:Id', del);		   // /time/delete/<id>

function set(req, res, next) {
 	var targetId = mongoose.Types.ObjectId(req.params.Id);
 	var targetUtc = req.params.utc;
 	var query = {Id:targetId};

	Time.findOneAndUpdate({_id: req.params.Id}, 
		{$set: {_id: req.params.Id, utc: req.params.utc}, $set: {utc: req.params.utc}}, 
		{upsert:true, new: true}, function(err, doc){
			doc.save(function(err, doc) {
				if (err) return handleError(err);
			})
			res.send(JSON.stringify(doc));
	});
 	
    return next();
};

function get(req, res, next) {
	var targetId = mongoose.Types.ObjectId(req.params.Id);
 	var targetTime = Time.find({_id: req.params.Id}, function (err, doc) {
 		if (err) res.send(err);
 	});

 	// convert target utc by timezone from HTTP request
 	var format = 'YYYY-MM-DD HH:mm:ss Z';
 	var newtime = moment(targetTime, format);  
 	newtime.tz(req.params.zone);      // use moment.js to convert timezone
 	res.send(newtime.toJSON());     // JSON resonse
 	return next();
}

function del(req, res, next) {
 	Time.findByIdAndRemove(mongoose.Types.ObjectId(req.params.Id), function (err, doc) {
  		if (err) return handleError(err);
  		res.send(JSON.stringify(doc));
	});
 	return next();
};


// module.exports = server
