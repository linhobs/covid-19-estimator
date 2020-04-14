const express = require('express');
const router = express.Router();
const { validationRules, validate } = require('../validator/validator');
const { estimate, estimateXml, estimateLogs } = require('../controllers/estimator');
//handle routes
router.post('/', validationRules(), estimate);
router.post('/json', validationRules(), validate, estimate);
router.post('/xml', validationRules(), validate, estimateXml);
router.get('/logs', estimateLogs);




module.exports = router;