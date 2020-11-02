const math = require('basic-math-ops/math');
const InvalidOperationError = require('../errors/InvalidOperationError')
const operationFunctions = {
    '+': math.sum,
    '-': math.subtract,
    '*': math.multiply,
    '/': math.divide
};

const validateOperation = (operation) => typeof operation === 'string' && typeof operationFunctions[operation] === 'function';

const performOperation = (numOne, numTwo, operation) => {
    if(!validateOperation(operation)) {
        throw new InvalidOperationError.InvalidOperationError();
    }
    const operationFunc = operationFunctions[operation];
    return operationFunc(numOne, numTwo);
}

exports.getOperation = (req) => {
    let { 'number-one': numOne, 'number-two': numTwo, operation } = req.query;
    numOne = !isNaN(numOne) ? parseFloat(numOne) : numOne;
    numTwo = !isNaN(numTwo) ? parseFloat(numTwo) : numTwo;
    return performOperation(numOne, numTwo, operation);
}

exports.postOperation = (req) => {
    const { 'number-one': numOne, 'number-two': numTwo, operation } = req.body;
    return performOperation(numOne, numTwo, operation);
}
