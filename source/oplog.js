var util = require('util');
var events = require('events');

function Oplog() {
    events.EventEmitter.call(this);
}

util.inherits(Oplog, events.EventEmitter);

module.exports = Oplog;
