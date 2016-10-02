/** 
 * Mongoose Schema for the Entity Passenger
 * @author Clark Jeria
 * @version 0.0.2
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PassengerSchema   = new Schema({
    firstName: {
        type: String,
        //required: true,
        trim: true,
        minlength: 1,
        maxlength: 15
    },
    lastName: {
        type: String,
        //required: true,
        trim: true,
        minlength: 1,
        maxlength: 15
    },
    dateOfBirth: {
        type: Date,
        trim: true
    },
    emailAddress: {
        type: String,
        trim: true,
        validate: [/[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/],
        required: true
    },
    username: {
        type: String,
        trim: true
    },
    password: {
        //used for POST only
        type: String,
        required: true,
        trim: true,
        minlength:8,
        maxlength:16
    },
    addressLine1: {
        type: String,
        trim: true,
        maxlength: 50 
    },
    addressLine2: {
        type: String,
        trim: true,
        maxlength: 50 
    },
    city: {
        type: String,
        trim: true,
        maxlength: 50
    },
    state: {
        type: String,
        trim: true,
        maxlength: 2 
    },
    zip: {
        type: Number,
        trim: true,
        maxlength: 5
    },
    phoneNumber: {
        type: Number,
        trim: true,
        validate: /[0-9]{3}\-[0-9]{3}\-[0-9]{4}/
    },
    paymentAccount: { 
        type: Schema.Types.ObjectId, 
        ref: 'paymentAccount' 
    }
});

module.exports = mongoose.model('Passenger', PassengerSchema);