var util = require('util');
var events = require('events');

var _ = require('lodash');
var mongo = require('mongojs');
var rx = require('rx-node');

function Oplog(connection, options) {
    this.connection = connection;
    this.options = options;

    events.EventEmitter.call(this);
}

_.extend(Oplog.prototype.connect, {
    connect: function () {
        var connection = mongo(this.connection);
        if (!connection) {
            return this.emit('error', 'failed to connect to mongo instance.');
        }

        

        return this;
    },

    observable: function () {
        return rx.fromReadableStream(this.cursor);
    }
});

util.inherits(Oplog, events.EventEmitter);

module.exports = Oplog;
