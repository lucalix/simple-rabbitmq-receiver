const express = require('express');
const amqp = require('amqplib/callback_api');

const app = express();

amqp.connect('amqp://localhost', (err, conn) => {
    
    if (err) {
        console.log('Erro ao criar conexão');
    }

    conn.createChannel((err, ch) => {
        const queue = 'FirstQueue';

        ch.assertQueue(queue, { durable: false });
        console.log(`Waiting for message in ${queue}`);
        ch.consume(queue, (message) => {
            console.log(`Received: ${message.content}`);
        }, {noAck: true});
    });

});

const port = 3001;

app.listen(port, () => console.log(`App listen on port ${port}`));
