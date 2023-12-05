const nodemailer = require('nodemailer');
const axios = require('axios');
const logger = require('../utils/logger.js');
const util = require('../utils/util.js');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.SMTP_MAIN_ACCOUNT,
        pass: process.env.SMTP_MAIN_PASSWORD,
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.SMTP_MAIN_ACCOUNT,
        to: to,
        subject: subject,
        html: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            logger.error(`
                Email sent to ${to}
                error: ${error}
                `);
        } else {
            logger.log(`
                Email sent to ${to}: ${info.response}
                `);
        }
    });
};

const sendEmailWithAttachment = async (to, subject, text, pdfUrl, pdfName) => {
    const pdfData = await util.downloadPDF(pdfUrl);

    const mailOptions = {
        from: process.env.SMTP_MAIN_ACCOUNT,
        to: to,
        subject: subject,
        html: text,
        attachments: [
            {
                filename: `${pdfName}.pdf`,
                content: pdfData,
            },
        ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            logger.error(`
                Email sent to ${to}
                error: ${error}
                `);
        } else {
            logger.log(`
                Email sent to ${to}: ${info.response}
                `);
        }
    });
};

module.exports = {
    sendEmail,
    sendEmailWithAttachment,
};
