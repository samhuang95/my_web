const request = require('supertest');
const app = require('../app.js');

describe('GET /model-upload-path API', () => {
    const apiUrl = '/model-upload-path';
    const timeout = 10 * 1000;
    const successMsg = 'success';

    test(
        'Get model upload path',
        (done) => {
            request(app)
                .get(apiUrl)
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.message).toBe(successMsg);
                    expect(response.body.data).not.toEqual({});
                    done();
                });
        },
        timeout
    );
});

describe('GET /data-upload-path/:modelVersion API', () => {
    const apiUrl = '/data-upload-path/:modelVersion';
    const timeout = 10 * 1000;
    const modelVersion =
        '38f8ac2275563bd275cf07a9e79c7e2f9b38d0850a4c10a4958efba8b2362127';
    const successMsg = 'success';

    test(
        'Get model upload path',
        (done) => {
            request(app)
                .get(apiUrl.replace(':modelVersion', modelVersion))
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.message).toBe(successMsg);
                    expect(response.body.data).not.toEqual({});
                    done();
                });
        },
        timeout
    );
});
