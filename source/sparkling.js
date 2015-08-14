var _ = require('lodash');
var Ddp = require('ddp-server-event');

var Oplog = require('./mongo/oplog');

function Sparkling(http, mongo) {
    var ddp = new Ddp({server: http});
    var oplog = new Oplog({connection: mongo});

    var subscriptions = {};

    var subscriptionKey = function (id, collection) {
        return id + '-' + collection;
    };

    var oplogFilter = function (e) {
        return _.contains(e.op, ['i', 'u', 'd']);
    };

    var oplogToDdpEvent = function (e) {
        var msgTypes = {
            'i': 'created',
            'u': 'updated',
            'd': 'removed'
        };

        return {
            id: e._id,
            msg: msgTypes[e.op],
            fields: e.o
        };
    };

    var createSubscription = function (id, collection, oplog) {
        var observable = oplog.createObservable(collection)
            .filter(oplogFilter)
            .map(oplogToDdpEvent);

        return {
            startObserving: function (ddp) {
                observable.subscribe(function (e) {
                    ddp.sendEvent(e);
                });
            },

            stopObserving: function () {
                observable.dispose();
            }
        };
    };

    return {
        listen: function () {
            ddp.on('ready', function () {
                console.log('ddp server ready');
            });

            ddp.on('error', function (err) {
                console.log('ddp server failed to start');
            });

            ddp.on('sub', function (id, collection, params) {
                var subscription = createSubscription(id, collection, oplog);
                var key = subscriptionKey(id, collection);

                subscriptions[key] = subscription;

                subscription.startObserving(this);
            });

            ddp.on('unsub', function (id, collection, params) {
                var subscriptionKey = subscriptionKey(id, collection);
                var key = subscriptionKey(id, collection);

                var subscription = subscriptions[key];

                subscription.stopObserving(this);
            });

            ddp.listen.apply(ddp, arguments);
        }
    };
}

module.exports = {
    createServer: function(server, options) {
        if (!options || !options.mongo) {
            throw new Error('missing mongo configuration');
        }

        return new Sparkling(server, options.mongo);
    }
};
