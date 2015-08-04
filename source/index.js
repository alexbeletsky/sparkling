function factory() {
    return function(req, res, next) {
        next();
    };
}

function sparkling(app) {
    return factory;
}

module.exports = sparkling;
