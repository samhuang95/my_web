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

describe('Get /models/:modelID/predicts/:predictID', () => {
    const apiUrl = '/models/:modelID/predicts/:predictID';
    const timeout = 10 * 1000;

    const predictID = 'aecs7ptbui2kukc4istlaktjrq';
    const modelID =
        '38f8ac2275563bd275cf07a9e79c7e2f9b38d0850a4c10a4958efba8b2362127';

    test(
        'Get correct predict',
        (done) => {
            request(app)
                .get(
                    apiUrl
                        .replace(':modelID', modelID)
                        .replace(':predictID', predictID)
                )
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    done();
                });
        },
        timeout
    );

    test(
        'Get predict with not exist modelID',
        (done) => {
            request(app)
                .get(
                    apiUrl
                        .replace(':modelID', '123')
                        .replace(':predictID', predictID)
                )
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.message).toBe(
                        `Model ID 123 does not exist`
                    );
                    done();
                });
        },
        timeout
    );

    test(
        'Get predict without modelID',
        (done) => {
            request(app)
                .get(
                    apiUrl
                        .replace(':modelID', '')
                        .replace(':predictID', predictID)
                )
                .then((response) => {
                    expect(response.statusCode).toBe(404);
                    done();
                });
        },
        timeout
    );

    test(
        'Get predict with another route',
        (done) => {
            request(app)
                .get(
                    apiUrl
                        .replace(':modelID', '/jiowfe/fjiewo123')
                        .replace(':predictID', predictID)
                )
                .then((response) => {
                    expect(response.statusCode).toBe(404);
                    done();
                });
        },
        timeout
    );

    test(
        'Get predict with not exist predictID',
        (done) => {
            request(app)
                .get(
                    apiUrl
                        .replace(':modelID', modelID)
                        .replace(':predictID', '123')
                )
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    done();
                });
        },
        timeout
    );

    test(
        'Get predict without predictID',
        (done) => {
            request(app)
                .get(
                    apiUrl
                        .replace(':modelID', modelID)
                        .replace(':predictID', '')
                )
                .then((response) => {
                    expect(response.statusCode).toBe(404);
                    done();
                });
        },
        timeout
    );
});

describe('Post /predict', () => {
    const predictApiUrl = '/predict';
    const queryApiUrl = '/models/:modelID/predicts/:predictID';

    const timeout = 30 * 1000;
    const modelID =
        '541af4b69293f1a1774c211afe82abb2dbd9da5e661c01a151276b613fc86e46';

    const payload = {
        input: {
            text: 'TestFromDXM',
        },
        userID: '367c8e7671574f2f986e076b7b51c70f',
        modelID: modelID,
    };

    let predictID;

    test(
        'Predict and Check',
        async () => {
            const responseA = await request(app)
                .post(predictApiUrl)
                .send(payload);

            expect(responseA.statusCode).toBe(201);
            predictID = responseA.body.data.id;
            console.log('predictID: ', predictID);

            await new Promise((resolve) => setTimeout(resolve, 10000));

            const response = await request(app).get(
                queryApiUrl
                    .replace(':modelID', modelID)
                    .replace(':predictID', predictID)
            );

            expect(response.statusCode).toBe(200);
            expect(response.body.data.status).toBe('succeeded');
        },
        timeout
    );
});
