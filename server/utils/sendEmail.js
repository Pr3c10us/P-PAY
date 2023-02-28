const emailClient = require('../azure/emailClient');
const { BadRequestError } = require('../errors');

const sendEmail = async (emailMessage) => {
    // send email
    const response = await emailClient.send(emailMessage);
    const messageId = response.messageId;
    if (messageId === null) {
        throw new Error();
    }

    const emailStatus = await emailClient.getSendStatus(messageId);

    if (emailStatus.status !== 'Queued') {
        throw new BadRequestError(
            'verification code failed to send. Check email and Try again.'
        );
    }
};

module.exports = sendEmail;
