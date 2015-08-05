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

    client.subscribe('accounts', [], function (err) {
        console.log('subscribe - accounts', err, client.collections);
    });
});
