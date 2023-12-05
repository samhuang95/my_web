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

describe('POST /models', () => {
    const apiUrl = '/models';
    const timeout = 10 * 1000;

    const payload = {
        category: 'test',
        userID: 'ae1ccf2543d643f682ee91ea6364fad5',
        modelID: 'test_modelID',
        bucket: 'bucket',
        dir: 'dir',
        modelName: 'model one',
        summary: 'summary',
        description: 'long long long description',
        limitation: 'long long long limitation',
        input: [
            {
                type: 'Text',
                format: 'String',
                description: 'Your name',
            },
        ],
        output: [
            {
                type: 'Text',
                format: 'String',
                description: 'Your name',
            },
        ],
        useCase: [
            {
                title: 'use case one',
                description: 'use case one description',
            },
            {
                title: 'use case two',
                description: 'use case two description',
            },
        ],
        businessValue: [
            {
                title: 'business value one',
                description: 'business value one description',
            },
            {
                title: 'business value two',
                description: 'business value two description',
            },
        ],
        credit: '1.1',
        unit: 'time',
        coverUrl: '',
        category: ['function test'],
        tags: [],
        source: 'rep',
    };

    test(
        'Create model',
        (done) => {
            request(app)
                .post(apiUrl)
                .send(payload)
                .then((response) => {
                    expect(response.statusCode).toBe(201);
                    done();
                });
        },
        timeout
    );
});

describe('Get /models', () => {
    const apiUrl = '/models';
    const timeout = 10 * 1000;

    test(
        'Get models',
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

    test(
        'Get model',
        (done) => {
            request(app)
                .get(
                    apiUrl +
                        '/541af4b69293f1a1774c211afe82abb2dbd9da5e661c01a151276b613fc86e46'
                )
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    done();
                });
        },
        timeout
    );
});
