var util = require('util');
var events = require('events');

function Ddp() {
    events.EventEmitter.call(this);
}

util.inherits(Ddp, events.EventEmitter);

module.exports = Ddp;


var server = new Ddp({server: server});

ddp.on('ready', function () {

});

ddp.on('error', function () {

});

ddp.on('sub', function () {

});

ddp.on('unsub', function () {

});

ddp.on('method:test', function () {

});


# Methods

ddp.sendResult();

ddp.sendError();

ddp.sendAdded();

ddp.sendChanged();

ddp.sendDeleted();

ddp.sendEvent();
