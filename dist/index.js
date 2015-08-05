'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _rx = require('rx');

// import {Ddp} from './ddp';
// import {Oplog} from './oplog';

var _rx2 = _interopRequireDefault(_rx);

function factory(app, options) {
    var _arguments = arguments;

    if (!options || !options.mongo) {
        throw new Error('missing mongo configuration');
    }

    var middleware = function middleware() {
        return function (req, res, next) {
            next();
        };
    };

    var createObservable = function createObservable(oplog, name, ddp) {
        return _rx2['default'].Observable.create(function (o) {
            oplog.on('op', function (e) {
                o.onNext(e);
            });

            oplog.on('error', function (err) {
                o.onError(err);
            });
        }).filter(function (e) {
            return e.ns.indexOf(name) > 0;
        });
    };

    var startObserving = function startObserving(name, responder, observable) {
        var changes = observable.filter(function (e) {
            return e.op === 'u';
        });

        changes.subscribe(function (e) {
            console.log('in observable changes', e);
            responder.collectionChanged(name, e.o);
        });
    };

    // overload app listen method
    app.listen = function () {
        var server = _http2['default'].createServer(app);
        var ddp = new DdpServer({ server: server });
        var oplog = new Oplog({ connection: opitions.mongo });

        return server.listen.apply(server, _arguments);
    };

    return middleware;
}

exports['default'] = factory;
module.exports = exports['default'];