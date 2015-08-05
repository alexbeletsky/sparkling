var rx = require('rx');
var http = require('http');
var DdpServer = require('ddp-server');
var MongoOplog = require('mongo-oplog');

function sparkling(app, options) {
    if (!options || !options.mongo) {
        throw new Error('missing mongo configuration');
    }

    function factory() {
        return function(req, res, next) {
            next();
        };
    }

    function createObservable(oplog, name, ddp) {
        return rx.Observable.create(function (o) {
            oplog.on('op', function (e) {
                o.onNext(e);
            });

            oplog.on('error', function (err) {
                o.onError(err);
            });
        }).filter(function (e) {
            return e.ns.indexOf(name) > 0;
        });
    }

    function startObserving(name, responder, observable) {
        var changes = observable.filter(function (e) {
            return e.op === 'u';
        });

        changes.subscribe(function (e) {
            console.log('in observable changes', e);

            responder.collectionChanged(name,  e.o);
        });
    }

    app.listen = function () {
        var server = http.createServer(this);
        var ddp = new DdpServer({server: server});
        var oplog = new MongoOplog(options.mongo.connection, {ns: options.mongo.db}).tail();

        var subscriptions = [];

        ddp.methods({
            sub: function (id, name, params, responder) {
                var observable = createObservable(oplog, name);
                subscriptions.push({id: id, observable: observable});

                startObserving(name, responder, observable);

                return 'ready';
            }
        });

        return server.listen.apply(server, arguments);
    };

    return factory;
}

module.exports = sparkling;
