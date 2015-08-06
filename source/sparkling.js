var Ddp = require('./ddp');
var Oplog = require('./oplog');

function Sparkling(http, mongo) {
    var ddp = new Ddp({server: http});
    var oplog = new Oplog({connection: mongo});

    return {
        start: function (callback) {
            ddp.on('ready', () => {
                console.log('ddp server ready');
            });

            oplog.on('ready', () => {
                console.log('oplog connection ready');
            });

            ddp.on('sub', () => {
                console.log('subscription');
            });

            ddp.on('unsub', () => {
                console.log('unsubscription');
            });

            //Promise.all([]).then(callback);
        }
    };
}

module.exports = {
    createServer: function(server, options) {
        if (!options || !options.mongo) {
            throw new Error('missing mongo configuration');
        }

        return new Sparkling(server, options.mongo);
    }
};
