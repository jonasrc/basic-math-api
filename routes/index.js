const express = require('express');
const router = express.Router();
const apiVersion = require('../configs/versions');
const HealthCheckController = require('../controllers/HealthCheckController');
const OperationController = require('../controllers/OperationController');

router.get('/', (req, res) => {
    res.json({
        'title': 'Welcome to the Basic Math Operations API!',
        'description': 'REST API based on the basic-math-ops, a npm package by the same author.',
        'author': 'Jonas Rocha Castanheira',
        'motive': 'Developed as part of the Distributed Software Architecture Graduate program - PUC-MG.'
    });
});

const healthCheckController = new HealthCheckController();
const operationController = new OperationController();
router.get(apiVersion.v1 + '/health-check', healthCheckController.get);
router.get(apiVersion.v1 + '/operations', operationController.get);
router.post(apiVersion.v1 + '/operations', operationController.post);

module.exports = router;
