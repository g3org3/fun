var Confidence = require('confidence');

var config = {
    port: {
        web: process.env.APP_PORT
    }
};

var store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key);
};


exports.meta = function (key) {

    return store.meta(key);
};
