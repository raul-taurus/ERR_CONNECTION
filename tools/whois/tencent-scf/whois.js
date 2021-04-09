'use strict';
exports.main_handler = (event, context, callback) => {
    var net = require('net');

    var client = new net.Socket();
    client.connect(43, 'whois.iana.org', function () {
        console.log('Connected');
        client.write('8.8.8.8\r\n');
    });

    client.on('data', function (data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
    });

    client.on('close', function () {
        console.log('Connection closed');
    });

    console.log("Hello World")
    console.log(event)
    console.log(event["non-exist"])
    console.log(context)
    callback(null, event);
};