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

    app.listen = function () {
        var server = http.createServer(this);
        var ddp = new DdpServer({server: server});
        var oplog = new MongoOplog(options.mongo.connection, {ns: options.mongo.db}).tail();

        ddp.methods({
            test: function () {
                console.log('ddp - test method called');
                return true;
            }
        });

        oplog.on('op', function (e) {
            console.log(e);
        });

        oplog.on('error', function (e) {
            console.error(e);
        });

        return server.listen.apply(server, arguments);
    };

    return factory;
}

module.exports = sparkling;
