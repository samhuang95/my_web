const request = require('supertest');
const app = require('../app.js');

describe('GET /image/* API', () => {
    const apiUrl = '/image/*';
    const timeout = 10 * 1000;
    const replicateImageUrl =
        '/pbxt/J97HjwmUukdoKSlUfhcwWtEflj7K6UGkuYziFIEcN1EP0pSm/7.jpg';

    test(
        'Get image from replicate',
        (done) => {
            request(app)
                .get(apiUrl.replace('*', replicateImageUrl))
                .then((response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response.headers['content-type']).toContain('image');
                    done();
                });
        },
        timeout
    );
});
