'use strict';

const net = require('net');
const client = new net.Socket();
const whoisServer = process.argv[3] || 'whois.iana.org';
const query = process.argv[2];
console.log({ query, whoisServer });

client.connect(43, whoisServer, function () {
    console.log('>>');
    client.write(`${query}\r\n`);
});

client.on('data', function (data) {
    console.log('<<\n' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('|EOF|');
});
