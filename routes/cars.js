/**
 * Express Route: /cars
 * @author Clark Jeria
 * @version 0.0.2
 */
var express = require('express');
var router = express.Router();

var Car = require('../app/models/car');

var reportError = require('../app/utils');

router.route('/cars')
    /**
     * GET call for the car entity (multiple).
     * @returns {object} A list of cars. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        Car.find(function (err, cars) {
            if (err) {
                res.status(500).send({
                    "errorCode": 2001,
                    "errorMsg": "no car data",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                res.json(cars);
            }
        });
    })
    /**
     * POST call for the car entity.
     * @param {string} license - The license plate of the new car
     * @returns {object} A message and the car created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function (req, res) {
        var car = new Car(req.body);
        // var car = new Car();
        // car.license = req.body.license;
        // car.door_number = req.body.door_number;
        // car.model = req.body.model;
        // var dictParams = {
        //   10011: 'license',
        //   10012: 'door_number'
        // };
        // if(car.license === undefined || car.license === 0 || car.license === null || car.license === '') {
        //
        // }
        // if(typeof car.license !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof car.doorCount !== 'number') {
        //     reportError.typeError('number', res);
        // }
        // if(typeof car.make !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof car.model !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // //error for missing parameter
        // if(!car.license) {
        //   reportError.missingParam('license', res);
        // }
        // if(!car.doorCount) {
        //   reportError.missingParam('doorCount', res);
        // }
        // if(!car.make) {
        //   reportError.missingParam('make', res);
        // }
        // if(!car.model) {
        //   reportError.missingParam('model', res);
        // }
        // //error for empty attribute
        // if(car.license === 'undefined'){
        //     reportError.emptyBody('license', res);
        // }
        // if(car.doorCount === 'undefined'){
        //     reportError.emptyBody('doorCount', res);
        // }
        // if(car.make === 'undefined'){
        //     reportError.emptyBody('make', res);
        // }
        // if(car.model === 'undefined'){
        //     reportError.emptyBody('model', res);
        // }
        // //error for invalid format
        // if(car.license ){
        //     reportError.invalidFormat('license', res);
        // }
        // //error for duplicate attribute
        // //error for invalid attribute value
        // //error for missing required attribute
        // //id should not provided
        // if(car.id){
        //     reportError.idShouldNotBeProvided('id', res)
        // }

        var car = new Car();
        car.license = req.body.license;
        car.doorCount = req.body.doorCount;
        car.make = req.body.make;
        car.model = req.body.model;

        car.save(function (err) {
            if (err) {
                // debugger;
                //var errorInfo = {};
                var dictError = {
                    required: 1001,
                    maxlength: 1002,
                    minlength: 1003,
                    type: 1004,
                    validate: 1005,
                }
                if (err.errors) {
                    for (var key in err.errors) {
                        var errorType = err.errors[key].kind;
                        if (errorType === "required") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                        else if (errorType === "maxlength") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                        else if (errorType === "minlength") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                        else if (errorType === "type") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                        else if (errorType === "validate") {
                            errorInfo = {
                                errorCode: dictError[errorType],
                                errorMessage: err.errors[key].message
                            }
                        }
                    }
                }
                res.status(500).send({
                    "errorCode": 1006,
                    "errorMsg": "Invalid value in driver",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                res.status(201).json({ "message": "Car Created", "car_created": car });
            }
        });
    });

/**
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/cars/:car_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        Car.findById(req.params.car_id, function (err, car) {
            if (err) {
                res.status(500).send({
                    "errorCode": 3001,
                    "errorMsg": 'Given car does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                res.json(car);
            }
        });
    })
    /**
     * PATCH call for the car entity (single).
     * @returns {object} A message and the car updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function (req, res) {
        Car.findById(req.params.car_id, function (err, car) {
            if (err) {
                res.status(500).send({
                    "errorCode": 3001,
                    "errorMsg": 'Given car does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                car.license = req.body.license;
                car.save(function (err) {
                    if (err) {
                        var dictError = {
                            required: 1001,
                            maxlength: 1002,
                            minlength: 1003,
                            type: 1004,
                            validate: 1005,
                        }
                        if (err.errors) {
                            for (var key in err.errors) {
                                var errorType = err.errors[key].kind;
                                if (errorType === "required") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                                else if (errorType === "maxlength") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                                else if (errorType === "minlength") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                                else if (errorType === "type") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                                else if (errorType === "validate") {
                                    errorInfo = {
                                        errorCode: dictError[errorType],
                                        errorMessage: err.errors[key].message
                                    }
                                }
                            }
                        }
                        res.status(500).send({
                            "errorCode": 1006,
                            "errorMsg": 'Invalid value in car',
                            "statusCode": 500,
                            "statusTxt": 'Mongoose Database Error'
                        });
                    } else {
                        res.json({ "message": "Car Updated", "car_created": car });
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the car entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function (req, res) {
        Car.remove({
            _id: req.params.car_id
        }, function (err, car) {
            if (err) {
                res.status(500).send({
                    "errorCode": 3001,
                    "errorMsg": 'Given car does not exist',
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                res.json({ "message": "Car Deleted" });
            }
        });
    });

module.exports = router;
