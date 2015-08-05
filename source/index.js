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

    function createObserver(oplog, ddp) {

    }

    app.listen = function () {
        var server = http.createServer(this);
        var ddp = new DdpServer({server: server});
        var oplog = new MongoOplog(options.mongo.connection, {ns: options.mongo.db}).tail();

        var subscriptions = [];

        // oplog.on('op', function (e) {
        //     console.log(e);
        // });
        //
        // oplog.on('error', function (e) {
        //     console.error(e);
        // });

        ddp.methods({
            sub: function (id, name, params) {
                subscriptions.push({id: id, observer: createObserver(oplog, ddp)});

                return 'ready';
            }
        });

        return server.listen.apply(server, arguments);
    };

    return factory;
}

module.exports = sparkling;
