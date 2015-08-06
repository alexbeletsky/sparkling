var util = require('util');
var events = require('events');

function Ddp() {
    events.EventEmitter.call(this);
}

util.inherits(Ddp, events.EventEmitter);

module.exports = Ddp;
