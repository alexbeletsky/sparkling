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
    console.log('in connect', err, connected);
});
