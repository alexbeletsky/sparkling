var util = require('util');
var events = require('events');

var _ = require('lodash');
var rx = require('rx-node');
var MongoOplog = require('mongo-oplog');

function Oplog(options) {
    this.mongoOplog = new MongoOplog(options.connection, {ns: options.db});

    events.EventEmitter.call(this);
}

_.extend(Oplog.prototype.connect, {
    observe: function () {
        var cursor = this.mongoOplog.tail();

        return rx.fromReadableStream(cursor);
    }
});

util.inherits(Oplog, events.EventEmitter);

module.exports = Oplog;
