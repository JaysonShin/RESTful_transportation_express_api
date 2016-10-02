/** 
 * Express Route: /drivers
 * @author Clark Jeria
 * @version 0.0.2
 */
var express = require('express');
var router = express.Router();

var Driver = require('../app/models/driver');

var reportError = require('../app/utils');

router.route('/drivers')
    /**
     * GET call for the car entity (multiple).
     * @returns {object} A list of cars. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        Driver.find().populate('-password').exec(function (err, drivers) {
            if (err) {
                res.status(500).send({
                    "errorCode": 2002,
                    "errorMsg": "no driver data",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                res.json(driver);
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
        var driver = new Driver(req.body);
        //error for attribute value's type 
        // if(typeof driver.firstName !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof driver.lastName !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof driver.dateOfBirth !== 'date') {
        //     reportError.typeError('date', res);
        // }
        // if(typeof driver.license !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof driver.emailAddress !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof driver.password !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof driver.addressLine1 !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof driver.addressLine2 !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof driver.city !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof driver.state !== 'string') {
        //     reportError.typeError('string', res);
        // }
        // if(typeof driver.zip !== 'number') {
        //     reportError.typeError('number', res);
        // }
        // if(typeof driver.phoneNumber !== 'number') {
        //     reportError.typeError('number', res);
        // }
        // // error for required attribute
        // if(driver.firstName === 'undefined'){
        //     reportError.emptyBody('firstname', res)
        // }
        // if(driver.lastName === 'undefined'){
        //     reportError.emptyBody('lastname', res)
        // }
        // if(driver.emailAddress === 'undefined'){
        //     reportError.emptyBody('emailaddress', res)
        // }
        // if(driver.password === 'undefined'){
        //     reportError.emptyBody('password', res)
        // }
        // //error for invalid attribute value
        // if(driver.emailAddress.indexOf('@') == -1){
        //     reportError.invalidAttibuteValue('emailaddress', res)
        // }
        //error for duplicate attribute


        var driver = new Driver();
        driver.firstName = req.body.firstName;
        driver.lastName = req.body.lastName;
        driver.dateOfBirth = req.body.dateOfBirth;
        driver.licenseType = req.body.licenseType;
        driver.username = req.body.username;
        driver.emailAddress = req.body.emailAddress;
        driver.password = req.body.password;
        driver.addressLine1 = req.body.addressLine1;
        driver.addressLine2 = req.body.addressLine2;
        driver.city = req.body.city;
        driver.state = req.body.state;
        driver.zip = req.body.zip;
        driver.phoneNumber = req.body.phoneNumber;

        driver.save(function (err) {

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

                //res.status(500).send(err);
                // res.status(500).json({
                //     errorCode: 1001,
                //     errorMsg: err.errors,
                //     statusCode: 400,
                //     statusTxt: 'Bad Request'
                // });
                res.status(500).send({
                    "errorCode": 1006,
                    "errorMsg": "Invalid value in driver",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                res.status(201).json({ "message": "Driver Created", "driver_created": driver });
            }
        });
    });

/**
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/drivers/:driver_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        Driver.findById(req.params.driver_id, function (err, driver) {
            if (err) {
                res.status(500).send({
                    "errorCode": 3002,
                    "errorMsg": "Given driver dose not exist",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                res.json(driver);
            }
        });
    })
    /**
     * PATCH call for the car entity (single).
     * @returns {object} A message and the car updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function (req, res) {
        if (typeof req.body.firstName === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "firstName"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.lastName === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "lastName"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.username === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "username"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.emailAddress === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "emailAddress"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.password === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "password"), "statusCode": "422" });
            return;
        }

        Driver.findById(req.params.driver_id, function (err, driver) {
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
                    "errorCode": 3002,
                    "errorMsg": "Given driver dose not exist",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                driver.firstName = req.body.firstName;
                driver.lastName = req.body.lastName;
                driver.dateOfBirth = req.body.dateOfBirth;
                driver.licenseType = req.body.licenseType;
                driver.username = req.body.username;
                driver.emailAddress = req.body.emailAddress;
                driver.password = req.body.password;
                driver.addressLine1 = req.body.addressLine1;
                driver.addressLine2 = req.body.addressLine2;
                driver.city = req.body.city;
                driver.state = req.body.state;
                driver.zip = req.body.zip;
                driver.phoneNumber = req.body.phoneNumber;

                car.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json({ "message": "Driver Updated", "driver_created": driver });
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
                    "errorCode": 3002,
                    "errorMsg": "Given driver does not exist",
                    "statusCode": 500,
                    "statusTxt": 'Mongoose Database Error'
                });
            } else {
                res.json({ "message": "Driver Deleted" });
            }
        });
    });

module.exports = router;