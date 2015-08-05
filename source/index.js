import http from 'http';
import Rx from 'rx';

// import {Ddp} from './ddp';
// import {Oplog} from './oplog';

function factory(app, options) {
    if (!options || !options.mongo) {
        throw new Error('missing mongo configuration');
    }

    let middleware = () => {
        return (req, res, next) => {
            next();
        };
    };

    let createObservable = (oplog, name, ddp) => {
        return Rx.Observable.create((o) => {
            oplog.on('op', (e) => {
                o.onNext(e);
            });

            oplog.on('error', (err) => {
                o.onError(err);
            });
        }).filter((e) => {
            return e.ns.indexOf(name) > 0;
        });
    };

    let startObserving = (name, responder, observable) => {
        var changes = observable.filter((e) => {
            return e.op === 'u';
        });

        changes.subscribe((e) => {
            console.log('in observable changes', e);
            responder.collectionChanged(name,  e.o);
        });
    };

    // overload app listen method
    app.listen = () => {
        let server = http.createServer(app);
        let ddp = new DdpServer({server: server});
        var oplog = new Oplog({connection: opitions.mongo});

        return server.listen.apply(server, arguments);
    };

    return middleware;
}

export default factory;
