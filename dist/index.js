'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _sparkling = require('./sparkling');

// import {Ddp} from './ddp';
// import {Oplog} from './oplog';

var _sparkling2 = _interopRequireDefault(_sparkling);

function factory(app, options) {
    var _arguments = arguments;

    var middleware = function middleware() {
        return function (req, res, next) {
            next();
        };
    };

    // overload app listen method
    app.listen = function () {
        var server = _http2['default'].createServer(app);
        var sparkling = sparkling.createServer(server, options);

        sparkling.start();

        return server.listen.apply(server, _arguments);
    };

    return middleware;
}

exports['default'] = factory;
module.exports = exports['default'];