var _ = require('lodash');
var Ddp = require('ddp-server-event');

var Oplog = require('./mongo/oplog');
var logger = require('./logger');

function Sparkling(http, mongo) {
    var ddp = new Ddp({server: http});
    var oplog = new Oplog({connection: mongo});

    var subscriptions = {};

    var msgTypes = {
        'i': 'added',
        'u': 'changed',
        'd': 'removed'
    };

    var subscriptionKey = function (id, collection) {
        return id + '-' + collection;
    };

    var oplogFilter = function (e) {
        return _.contains(_.keys(msgTypes), e.op);
    };

    var oplogToDdpEvent = function (e) {
        return {
            id: e.o._id,
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
                    logger.info('overserver for', collection, 'recieved event', e.msg, e);

                    ddp.sendEvent(e.msg, e);
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
                logger.info('ddp server ready');
            });

            oplog.on('ready', function (e) {
                logger.info('oplog ready', e.connection);
            });

            ddp.on('error', function (err) {
                logger.info('ddp server failed to start');
            });

            ddp.on('sub', function (id, collection, params) {
                var subscription = createSubscription(id, collection, oplog);
                var key = subscriptionKey(id, collection);

                subscriptions[key] = subscription;
                subscription.startObserving(this);

                logger.info('subscribed', id, collection);
                logger.info('sending ready');

                this.sendReady(id);
            });

            ddp.on('unsub', function (id, collection, params) {
                var subscriptionKey = subscriptionKey(id, collection);
                var key = subscriptionKey(id, collection);

                var subscription = subscriptions[key];

                subscription.stopObserving(this);

                logger.info('usubscribed', id, collection);
                logger.info('sending ready');

                this.sendReady(id);
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
