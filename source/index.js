import http from 'http';
import sparkling from './sparkling';

// import {Ddp} from './ddp';
// import {Oplog} from './oplog';

function factory(app, options) {
    let middleware = () => {
        return (req, res, next) => {
            next();
        };
    };

    // overload app listen method
    app.listen = () => {
        let server = http.createServer(app);
        let sparkling = sparkling.createServer(server, options);

        sparkling.start();

        return server.listen.apply(server, arguments);
    };

    return middleware;
}

export default factory;
