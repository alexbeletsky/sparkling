import Ddp from './ddp';
import Oplog from './oplog';

function Sparkling(http, mongo) {
    let ddp = new Ddp({server: http});
    let oplog = new Oplog({connection: mongo});

    return {
        start: function (callback) {
            console.log('Sparkling started');

            // ddp.on('ready', () => {
            //     console.log('ddp server ready');
            // });
            //
            // oplog.on('ready', () => {
            //     console.log('oplog connection ready');
            // });
            //
            // ddp.on('sub', () => {
            //     console.log('subscription');
            // });
            //
            // ddp.on('unsub', () => {
            //     console.log('unsubscription');
            // });
            //
            // oplog.connect();
            // ddp.start();
            callback();
        }
    };
}

let factory = {
    createServer: function(server, options) {
        if (!options || !options.mongo) {
            throw new Error('missing mongo configuration');
        }

        return new Sparkling(server, options.mongo);
    }
};

export default factory;
