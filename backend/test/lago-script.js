require('dotenv').config(); // 最一開始的時候就要讀 .env

const fs = require('fs');
const lagoRequest = require('../src/utils/lago-request');

(async () => {
    const path = 'C:/Users/hank/Desktop/lago_data/plan.json';

    fs.readFile(path, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error:', err);
            return;
        }

        const jsonData = JSON.parse(data);

        for (let index = 0; index < jsonData.length; index++) {
            const element = jsonData[index].plan;
            // console.log(element);
            const r = await lagoRequest.createPlan(element);

            console.log(r);
        }
    });
})();
