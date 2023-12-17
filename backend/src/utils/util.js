const crypto = require('crypto');
const axios = require('axios');
const { getAccount } = require('../models/account_model.js');
const { ReturnDocument } = require('mongodb');

const generateSalt = (length = 16) => {
    return crypto.randomBytes(length).toString('hex');
};

const generateUUID = () => {
    return crypto.randomUUID();
};

const encryptWithSalt = (data, salt) => {
    return crypto
        .createHash('sha256')
        .update(data + salt)
        .digest('hex');
};

const encryptToSHA256 = (input) => {
    return crypto.createHash('sha256').update(input).digest('hex');
};

/** 檢查是否含 undefined 的資料
 *
 * @param {*} list
 * @returns true 代表含有 undefined
 */
const hasUndefinedData = (list) => {
    return !list.every((element) => element !== undefined || element === null);
};

const requestImage = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                responseType: 'arraybuffer',
            })
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(`startSibituTask: ${error}`);
            });
    });
};

const getFileSize = (url) => {
    return axios
        .head(url)
        .then((response) => {
            const fileSize = response.headers['content-length'];
            return fileSize;
        })
        .catch((error) => {
            console.error('Failed to get file size:', error);
            throw error;
        });
};

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
};

const isEmailExist = async (email) => {
    const mail = await getAccount({ email: email });

    if (Object.keys(mail).length === 0) {
        return false;
    }
    return true;
};

const downloadPDF = async (url) => {
    const response = await axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer',
    });

    return response.data;
};

module.exports = {
    generateSalt,
    generateUUID,
    encryptWithSalt,
    encryptToSHA256,
    hasUndefinedData,
    requestImage,
    getFileSize,
    isValidEmail,
    isEmailExist,
    downloadPDF,
};
