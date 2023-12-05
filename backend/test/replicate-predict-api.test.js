require('dotenv').config(); // 最易開始的時候就要讀 .env

const request = require('supertest');
const app = require('../app.js');

describe('POST /replicate/predict API and check result', () => {
    const predictApiUrl = '/replicate/predict';
    const queryApiUrl = '/replicate/query';
    const timeout = 20 * 1000;

    const parameter = {
        modelVersion:
            '541af4b69293f1a1774c211afe82abb2dbd9da5e661c01a151276b613fc86e46',
        searchType: 'find_predict',
    };

    const payload = {
        input: {
            text: 'TestFromDXM',
        },
        userID: 'user_one',
    };

    let predictID;

    test(
        'Predict and Check',
        async () => {
            const responseA = await request(app)
                .post(predictApiUrl)
                .query(parameter)
                .send(payload);

            expect(responseA.statusCode).toBe(201);
            predictID = responseA.body.data.id;
            console.log('predictID: ', predictID);

            await new Promise((resolve) => setTimeout(resolve, 10000));

            const response = await request(app)
                .get(queryApiUrl)
                .query({ ...parameter, predictID: predictID });

            expect(response.statusCode).toBe(200);
            expect(response.body.data.status).toBe('succeeded');
        },
        timeout
    );
});
