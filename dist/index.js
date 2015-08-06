'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _sparkling = require('./sparkling');

var _sparkling2 = _interopRequireDefault(_sparkling);

function factory(app, options) {
    var middleware = function middleware() {
        return function (req, res, next) {
            next();
        };
    };

    // overload app listen method
    app.listen = function () {
        var _arguments = arguments;

        var httpServer = _http2['default'].createServer(app);
        var sparklingServer = _sparkling2['default'].createServer(httpServer, options);

        sparklingServer.start(function (err) {
            if (err) {
                throw new Error(err);
            }

            httpServer.listen.apply(httpServer, _arguments);
        });
    };

    return middleware;
}

exports['default'] = factory;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map