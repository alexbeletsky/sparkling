var DDP = require('ddp.js');
var webSocket = require('faye-websocket');

var options = {
    endpoint: 'http://localhost:3000/websocket',
    SocketConstructor: webSocket.Client
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


// var DDPClient = require('ddp');
//
// var client = new DDPClient({
//     host : "localhost",
//     port : 3000,
//     ssl  : false,
//     autoReconnect : true,
//     autoReconnectTimer : 500,
//     maintainCollections : true,
//     ddpVersion : '1'
// });
//
// client.connect(function (err, connected) {
//     if (err) {
//         throw err;
//     }
//
//     client.subscribe('accounts', [], function (err) {
//         console.log('subscribe - accounts', err, client.collections);
//     });
//
//     var observable = client.observe('accounts');
//     observable.changed = function(id, oldFields, clearedFields) {
//         console.log("[CHANGED] in " + observable.name + ":  " + id);
//         console.log("[CHANGED] old field values: ", oldFields);
//         console.log("[CHANGED] cleared fields: ", clearedFields);
//     };
// });
