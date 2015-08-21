var http = require('http');
var sparkling = require('./sparkling');

function factory(app, options) {
    var middleware = function () {
        return function(req, res, next) {
            next();
        };
    };

    // overload app listen method
    app.listen = function () {
        var httpServer = http.createServer(app);
        var sparklingServer = sparkling.createServer(httpServer, options);

        // sparklingServer will call http.listen()
        sparklingServer.listen.apply(sparklingServer, arguments);
    };

    return middleware;
}

module.exports = factory;
