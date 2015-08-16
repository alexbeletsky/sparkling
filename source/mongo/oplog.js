var util = require('util');
var events = require('events');

var rx = require('rx');
var MongoOplog = require('mongo-oplog');

function Oplog(options) {
    this.mongoOplog = new MongoOplog(options.connection.connection, {ns: options.connection.db});

    events.EventEmitter.call(this);

    this.createObservable = function (name) {
        var cursor = this.mongoOplog.tail();

        return rx.Observable.create(function (o) {
            cursor.on('op', function (e) {
                o.onNext(e);
            });

            cursor.on('error', function (err) {
                o.onError(err);
            });
        }).filter(function (e) {
            return e.ns.indexOf(name) > 0;
        });
    };

    this.emit('ready', options.connection);
}

util.inherits(Oplog, events.EventEmitter);

module.exports = Oplog;
