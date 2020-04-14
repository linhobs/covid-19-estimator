const xml = require('xml2js');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
// import covid19ImpactEstimator from '../estimator';
const covid19ImpactEstimator = require('.././estimator');

exports.estimate = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors);
        }
        //pass request body to estimator
        //console.log('getting post');
        const response = covid19ImpactEstimator(req.body);
        //return estimated data
        res.status(200).json(response);

    } catch (error) {
        next(error);
    }
}

exports.estimateXml = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors);
        }
        //xml builder
        const builder = new xml.Builder({
            renderOpts: { pretty: true }
        });
        const response = covid19ImpactEstimator(req.body);

        res.status(200).type('application/xml').send(builder.buildObject(response));

    } catch (error) {
        next(error);
    }
}

exports.estimateLogs = async (req, res, next) => {
    try {


        const filepath = path.join(basedir, 'logs/access.log');
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) throw err;
            res.status(200).type('text/plain').send(data);
        });


    } catch (error) {
        next(error);
    }
}