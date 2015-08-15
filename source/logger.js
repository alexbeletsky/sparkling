var chalk = require('chalk');
var pack = require('../package');

var prefix = pack.name + '-' + pack.version;

var logger = {
    info: function () {
        var args = [
            chalk.green('[info]'),
            chalk.cyan(prefix)
        ].concat(Array.prototype.slice.call(arguments));

        console.log.apply(console, args);
    },

    warning: function () {
        var args = [
            chalk.yellow('[warning]'),
            chalk.cyan(prefix)
        ].concat(Array.prototype.slice.call(arguments));

        console.log.apply(console, args);
    },

    error: function () {
        var args = [
            chalk.red('[error]'),
            chalk.cyan(prefix)
        ].concat(Array.prototype.slice.call(arguments));

        console.error.apply(console, args);
    }
};

module.exports = logger;
