var DDPClient = require('ddp');

var client = new DDPClient({
    host : "localhost",
    port : 3000,
    ssl  : false,
    autoReconnect : true,
    autoReconnectTimer : 500,
    maintainCollections : true,
    ddpVersion : '1'
});

client.connect(function (err, connected) {
    if (err) {
        throw err;
    }

    console.log('connected to ddp server');

    client.call('test', {}, function (err, response) {
        console.log('in callback 1', err, response);
    }, function (err, response) {
        console.log('in callback 2', err, response);
    });
});
