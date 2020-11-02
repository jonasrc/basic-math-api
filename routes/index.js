const express = require('express');
const router = express.Router();

const HealthCheckController = require('../controllers/HealthCheckController');
const OperationController = require('../controllers/OperationController');

const healthCheckController = new HealthCheckController();
const operationController = new OperationController();
router.get('/health-check', healthCheckController.get);
router.get('/operations', operationController.get);
router.post('/operations', operationController.post);

module.exports = router;
