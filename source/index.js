var http = require('http');
var sparkling = require('./sparkling');

function factory(app, options) {
    var middleware = function () {
        return (req, res, next) => {
            next();
        };
    };

    // overload app listen method
    app.listen = function () {
        var httpServer = http.createServer(app);
        var sparklingServer = sparkling.createServer(httpServer, options);

        var args = arguments;

        sparklingServer.start(function (err) {
            if (err) {
                throw new Error(err);
            }

            httpServer.listen.apply(httpServer, args);
        });
    };

    return middleware;
}

module.exports = factory;
