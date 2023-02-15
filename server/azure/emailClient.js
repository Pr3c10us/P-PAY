const { EmailClient } = require('@azure/communication-email');

const connectionString = process.env.EMAIL_CONNECTION_STRING;
const client = new EmailClient(connectionString);

module.exports = client;
