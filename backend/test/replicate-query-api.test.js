require('dotenv').config(); // 最易開始的時候就要讀 .env

const request = require('supertest');
const app = require('../app.js');
const { replaceUrl } = require('../src/controllers/controller.js');

describe('GET /replicate/query API', () => {
    const apiUrl = '/replicate/query';
    const timeout = 10 * 1000;
    const parameters = [
        {},
        {
            modelVersion:
                '541af4b69293f1a1774c211afe82abb2dbd9da5e661c01a151276b613fc86e46',
        },
        {
            predictID: 'zosbyjjb3ehaqvjmekbuvbli6m',
        },
        {
            userID: 'user_one',
        },
    ];
    const findModelResponse = [400, 200, 400, 400];
    const findModelResultResponse = [400, 200, 400, 400];
    const findPredictResponse = [400, 400, 200, 400];
    const findUserResultResponse = [400, 400, 400, 200];

    test(
        'Query without researchType',
        (done) => {
            request(app)
                .get(apiUrl)
                .then((response) => {
                    expect(response.statusCode).toBe(400);
                    done();
                });
        },
        timeout
    );

    test(
        'Query with searchType = find_model_list and another parameters',
        (done) => {
            const promises = parameters.map((p) => {
                return request(app)
                    .get(apiUrl)
                    .query({ ...{ searchType: 'find_model_list' }, ...p });
            });

            Promise.all(promises).then((responses) => {
                responses.forEach((response) => {
                    expect(response.statusCode).toBe(200);
                });
                done();
            });
        },
        timeout
    );

    test(
        'Query with searchType = find_model and another parameters',
        (done) => {
            const promises = parameters.map((p) => {
                return request(app)
                    .get(apiUrl)
                    .query({ ...{ searchType: 'find_model' }, ...p });
            });

            Promise.all(promises).then((responses) => {
                responses.forEach((response, i) => {
                    expect(response.statusCode).toBe(findModelResponse[i]);
                });
                done();
            });
        },
        timeout
    );

    test(
        'Query with searchType = find_model_result and another parameters',
        (done) => {
            const promises = parameters.map((p) => {
                return request(app)
                    .get(apiUrl)
                    .query({ ...{ searchType: 'find_model_result' }, ...p });
            });

            Promise.all(promises).then((responses) => {
                responses.forEach((response, i) => {
                    expect(response.statusCode).toBe(
                        findModelResultResponse[i]
                    );
                });
                done();
            });
        },
        timeout
    );

    test(
        'Query with searchType = find_predict and another parameters',
        (done) => {
            const promises = parameters.map((p) => {
                return request(app)
                    .get(apiUrl)
                    .query({ ...{ searchType: 'find_predict' }, ...p });
            });

            Promise.all(promises).then((responses) => {
                responses.forEach((response, i) => {
                    expect(response.statusCode).toBe(findPredictResponse[i]);
                });
                done();
            });
        },
        timeout
    );

    test(
        'Query with searchType = find_user_result and another parameters',
        (done) => {
            const promises = parameters.map((p) => {
                return request(app)
                    .get(apiUrl)
                    .query({ ...{ searchType: 'find_user_result' }, ...p });
            });

            Promise.all(promises).then((responses) => {
                responses.forEach((response, i) => {
                    expect(response.statusCode).toBe(findUserResultResponse[i]);
                });
                done();
            });
        },
        timeout
    );

    test(
        'Query replaceUrl function',
        (done) => {
            // 只保留 function 有用到的欄位
            const fakeDataObj = {
                imageInput_imageOutput: {
                    status: 'succeeded',
                    input: {
                        image: 'https://replicate.delivery/pbxt/J97HjwmUukdoKSlUfhcwWtEflj7K6UGkuYziFIEcN1EP0pSm/7.jpg',
                    },
                    output: [
                        {
                            licence_plate:
                                'https://replicate.delivery/pbxt/eAYd0hfJEMmNzkQ8eEKbbfYTyB2gDptefZar25etLTXpefPdiA/tmp6bz8w0ce7_plate0.jpg',
                            license_plate_number: 'AFA3090',
                        },
                        {
                            licence_plate:
                                'https://replicate.delivery/pbxt/X0TxeTkFR63hQimu7l1e5ETHDgTNc39DQx2GaM1ArOMeff0JC/tmp6bz8w0ce7_plate1.jpg',
                            license_plate_number: 'EWA5981',
                        },
                        {
                            licence_plate:
                                'https://replicate.delivery/pbxt/e8u0xekBIHvuUUBu8hkvV0quWbjtVH9O9HEx6bWICrieff0JC/tmp6bz8w0ce7_plate2.jpg',
                            license_plate_number: '203JUT',
                        },
                    ],
                },
                imageInput_emptyArrayOutput: {
                    status: 'succeeded',
                    input: {
                        image: 'https://replicate.delivery/pbxt/J97HjwmUukdoKSlUfhcwWtEflj7K6UGkuYziFIEcN1EP0pSm/7.jpg',
                    },
                    output: [],
                },
                imageInput_nullOutput: {
                    status: 'succeeded',
                    input: {
                        image: 'https://replicate.delivery/pbxt/J97HjwmUukdoKSlUfhcwWtEflj7K6UGkuYziFIEcN1EP0pSm/7.jpg',
                    },
                    output: null,
                },
                imageInput_undefinedOutput: {
                    status: 'succeeded',
                    input: {
                        image: 'https://replicate.delivery/pbxt/J97HjwmUukdoKSlUfhcwWtEflj7K6UGkuYziFIEcN1EP0pSm/7.jpg',
                    },
                },
                textInput_textOutput: {
                    status: 'succeeded',
                    input: {
                        text: 'text',
                    },
                    output: 'text',
                },
                textInput_nullOutput: {
                    status: 'succeeded',
                    input: {
                        text: 'text',
                    },
                    output: null,
                },
                textInput_undefinedOutput: {
                    status: 'succeeded',
                    input: {
                        text: 'text',
                    },
                },
            };

            let fakeDataList = [];

            Object.keys(fakeDataObj).forEach((key) => {
                replaceUrl(fakeDataObj[key]);
                fakeDataList.push(fakeDataObj[key]);
            });

            replaceUrl(fakeDataList);

            done();
        },
        timeout
    );
});
