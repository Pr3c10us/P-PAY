const amqplib = require('amqplib');

const rabbitChannel = async () => {
    const queueName = 'Transfer';
    const connection = await amqplib.connect(process.env.RABBIT_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    return { channel, connection };
};

module.exports = rabbitChannel;
