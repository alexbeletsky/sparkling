var http = require('http');
var DdpServer = require('ddp-server');

function sparkling(app) {

    function factory() {
        return function(req, res, next) {
            next();
        };
    }

    app.listen = function () {
        var server = http.createServer(this);
        var ddp = new DdpServer({server: server});

        ddp.methods({
            test: function () {
                console.log('ddp - test method called');
                return true;
            }
        });

        return server.listen.apply(server, arguments);
    };

    return factory;
}

module.exports = sparkling;
