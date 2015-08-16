var DDP = require('ddp.js');
var webSocket = require('faye-websocket');

var options = {
    endpoint: 'http://localhost:3000/websocket',
    SocketConstructor: webSocket.Client
};

var ddp = new DDP(options);

ddp.on('connected', function () {
    console.log('client connected');

    ddp.on('ready', function (msg) {
        console.log('ready', msg);
    });

    ddp.on('changed', function (msg) {
        console.log('changed', msg);
    });

    ddp.sub('accounts', {user: 'test@user.com'});
});
