const request = require('supertest')
const app = require('../app')
const apiVersion = require('../configs/versions');

describe('Tries to perform operation via POST request without any parameters', () => {
    it('should throw invalid operation error', async () => {
        const res = await request(app)
            .post(apiVersion.v1 + '/operations')
            .send()
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Tries to perform operation via POST request with an invalid operation', () => {
    it('should throw invalid operation error', async () => {
        const res = await request(app)
            .post(apiVersion.v1 + '/operations')
            .send({
                'number-one': 12,
                'number-two': 2,
                'operation': 'abc'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Tries to perform operation via POST request with non-numeric strings as numbers', () => {
    it('should throw invalid parameters error', async () => {
        const res = await request(app)
            .post(apiVersion.v1 + '/operations')
            .send({
                'number-one': 'abc',
                'number-two': 'abc',
                'operation': '+'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Performs sum operation via POST request', () => {
    it('should return 12 + 2 = 14', async () => {
        const res = await request(app)
            .post(apiVersion.v1 + '/operations')
            .send({
                'number-one': 12,
                'number-two': 2,
                'operation': '+'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result', 14)
    })
})

describe('Performs subtraction operation via POST request', () => {
    it('should return 12 - 2 = 10', async () => {
        const res = await request(app)
            .post(apiVersion.v1 + '/operations')
            .send({
                'number-one': 12,
                'number-two': 2,
                'operation': '-'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result', 10)
    })
})

describe('Performs multiplication operation via POST request', () => {
    it('should return 12 * 2 = 24', async () => {
        const res = await request(app)
            .post(apiVersion.v1 + '/operations')
            .send({
                'number-one': 12,
                'number-two': 2,
                'operation': '*'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result', 24)
    })
})

describe('Performs division operation via POST request', () => {
    it('should return 12 / 2 = 6', async () => {
        const res = await request(app)
            .post(apiVersion.v1 + '/operations')
            .send({
                'number-one': 12,
                'number-two': 2,
                'operation': '/'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result', 6)
    })
})

describe('Tries to perform a division by zero operation via POST request', () => {
    it('should throw division by zero error', async () => {
        const res = await request(app)
            .post(apiVersion.v1 + '/operations')
            .send({
                'number-one': 12,
                'number-two': 0,
                'operation': '/'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})