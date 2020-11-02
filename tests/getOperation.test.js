const request = require('supertest')
const app = require('../app')
const apiVersion = require('../configs/versions');

describe('Tries to perform operation via GET request without any query parameters', () => {
    it('should throw invalid operation error', async () => {
        const res = await request(app).get(apiVersion.v1 + '/operations').send()
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Tries to perform operation via GET request with an invalid operation', () => {
    it('should throw invalid operation error', async () => {
        const res = await request(app).get(apiVersion.v1 + '/operations?number-one=12&number-two=2&operation=abc').send()
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Tries to perform operation via GET request with non-numeric strings as numbers', () => {
    it('should throw invalid parameters error', async () => {
        const res = await request(app).get(apiVersion.v1 + '/operations?number-one=abc&number-two=abc&operation=abc').send()
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})

describe('Performs sum operation via GET request', () => {
    it('should return 12 + 2 = 14', async () => {
        const res = await request(app).get(apiVersion.v1 + '/operations?number-one=12&number-two=2&operation=%2B').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result', 14)
    })
})

describe('Performs subtraction operation via GET request', () => {
    it('should return 12 - 2 = 10', async () => {
        const res = await request(app).get(apiVersion.v1 + '/operations?number-one=12&number-two=2&operation=%2D').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result', 10)
    })
})

describe('Performs multiplication operation via GET request', () => {
    it('should return 12 * 2 = 24', async () => {
        const res = await request(app).get(apiVersion.v1 + '/operations?number-one=12&number-two=2&operation=*').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result', 24)
    })
})

describe('Performs division operation via GET request', () => {
    it('should return 12 / 2 = 6', async () => {
        const res = await request(app).get(apiVersion.v1 + '/operations?number-one=12&number-two=2&operation=%2F').send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result', 6)
    })
})

describe('Tries to perform a division by zero operation via GET request', () => {
    it('should throw division by zero error', async () => {
        const res = await request(app).get(apiVersion.v1 + '/operations?number-one=12&number-two=0&operation=%2F').send()
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
    })
})