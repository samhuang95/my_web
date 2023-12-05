require('dotenv').config(); // 最易開始的時候就要讀 .env

const request = require('supertest');
const app = require('../app.js');
const db = require('../src/models/db.js');

beforeAll(() => {
    db.connect();
});

afterAll(() => {
    db.close();
});

describe('GET /model-filter-options', () => {
    const apiUrl = '/model-filter-options';
    const timeout = 10 * 1000;

    test(
        'Get option',
        (done) => {
            request(app)
                .get(apiUrl)
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    done();
                });
        },
        timeout
    );
});

describe('POST /model-filter-options', () => {
    const apiUrl = '/model-filter-options';
    const timeout = 10 * 1000;

    const payload = {};

    test(
        'Create option with empty payload',
        (done) => {
            request(app)
                .post(apiUrl)
                .send({})
                .then((response) => {
                    expect(response.statusCode).toBe(400);
                    done();
                });
        },
        timeout
    );

    test(
        'Create option with not correct payload',
        (done) => {
            request(app)
                .post(apiUrl)
                .send({ tagName: '123' })
                .then((response) => {
                    expect(response.statusCode).toBe(400);
                    done();
                });
        },
        timeout
    );

    test(
        'Create option with  correct payload',
        (done) => {
            request(app)
                .post(apiUrl)
                .send({ tagName: 'function test', tagType: 'function test' })
                .then((response) => {
                    expect(response.statusCode).toBe(201);
                    done();
                });
        },
        timeout
    );
});
