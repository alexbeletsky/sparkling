// import sparkling from '../../../client';

var DDP = require('ddp.js');

var options = {
    endpoint: 'ws://localhost:3000/websocket',
    SocketConstructor: WebSocket
};

var ddp = new DDP(options);

ddp.on('connected', function () {
    ddp.on('ready', function (msg) {
        console.log('ready', msg);
    });

    ddp.on('changed', function (msg) {
        console.log('changed', msg);
    });

    ddp.sub('accounts', {user: 'test@user.com'});
});
