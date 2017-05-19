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

	Time.findOneAndUpdate({_id: targetId}, 
		{$set: {_id: targetId, utc: targetUtc}, $set: {utc: targetUtc}}, 
		{upsert:true, new: true}, function(err, doc){
			if (err) return handleError(err);
			doc.save(function(err, doc) {
				if (err) return handleError(err);
			})
			res.send(doc);
	});
 	
    return next();
};

function get(req, res, next) {
	var targetId = mongoose.Types.ObjectId(req.params.Id);
	var targetZone = req.params.zone;
 	var targetTime = Time.find({_id: targetId}, function (err, doc) {
 		if (err) return handleError(err);
 	});

 	// convert target utc by timezone from HTTP request
 	var newtime = moment.tz(targetTime, targetZone);  
 	newtime.format();      
 	res.send(newtime.toJSON());   
 	return next();
}

function del(req, res, next) {
	var targetId = mongoose.Types.ObjectId(req.params.Id);

 	Time.findByIdAndRemove(targetId, function (err, doc) {
  		if (err) return handleError(err);
  		res.send(doc);
	});
 	return next();
};


// module.exports = server
