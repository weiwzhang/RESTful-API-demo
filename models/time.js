/*RESTful API demo
times collection in MongoDB database
 --- @author Weiwei Zhang*/


var mongoose = require('mongoose');


/*create Schema*/
var TimeSchema = new mongoose.Schema({
    utc: String,
    _id: mongoose.Schema.Types.ObjectId
});


/*create Model*/
var Time = mongoose.model('Time', TimeSchema);


// create documents to save Collection???
// var test_time = new Time({utc: '00:00'});

// test_time.save(function (err) {
//     console.log('time saved!')
//     if (err) return handleError(err);
// });


/*export to create Model class*/
module.exports = Time;
