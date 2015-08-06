import http from 'http';
import sparkling from './sparkling';

function factory(app, options) {
    let middleware = () => {
        return (req, res, next) => {
            next();
        };
    };

    // overload app listen method
    app.listen = function () {
        let httpServer = http.createServer(app);
        let sparklingServer = sparkling.createServer(httpServer, options);

        sparklingServer.start((err) => {
            if (err) {
                throw new Error(err);
            }

            httpServer.listen.apply(httpServer, arguments);
        });
    };

    return middleware;
}

export default factory;
