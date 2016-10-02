var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RideSchema   = new Schema({
	passenger: {type: Schema.ObjectId, ref: 'Passenger'},
	driver: {type: Schema.ObjectId, ref: 'Driver'},
	car: {type: Schema.ObjectId, ref: 'Car'},
	rideType: { type: String, enum: ['ECONOMY', 'PREMIUM', 'EXECUTIVE'] },
	startPoint: { latitude: Number, longitude: Number },
	endPoint: { latitude: Number, longitude: Number },
	requestTime: Date,
	pickupTime: Date,
	dropOffTime: Date,
	status: { type: String, enum: ['REQUESTED', 'AWAITING_DRIVER', 'DRIVE_ASSIGNED', 'IN_PROGRESS', 'ARRIVED', 'CLOSED'] },
	fare: Number,
	route: [{ latitude: Number, longitude: Number }]
});

module.exports = mongoose.model('Ride', RideSchema);