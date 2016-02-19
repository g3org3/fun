var Confidence = require('confidence');

var config = {
   port: {
      web: process.env.APP_PORT
   },
   app: {
      port: process.env.APP_PORT,
      env: process.env.APP_ENV || 'development',
      redis: process.env.REDIS || '192.168.99.100'
   }
};

var store = new Confidence.Store(config);

exports.get = function (key, criteria) {
    if(!criteria) criteria = {};
    return store.get(key, criteria);
};


exports.meta = function (key, criteria) {
    if(!criteria) criteria = {};
    return store.meta(key, criteria);
};
