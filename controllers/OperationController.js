const statusCodes = require('http-status-codes');
const operationService = require('../services/operationService');

class OperationController {
  async get(req, res, next) {
    try {
      const result = operationService.getOperation(req);
      res.status(statusCodes.OK).json({'result': result});
    } catch(error) {
      next(error);
    }
  };

  async post(req, res, next) {
    try {
      const result = operationService.postOperation(req);
      res.status(statusCodes.OK).json({'result': result});
    } catch(error) {
      next(error);
    }
  };
}

module.exports = OperationController;
