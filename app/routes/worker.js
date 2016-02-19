
var Hoek = require('hoek');
var Worker = require('../handlers/worker.js')
var redis = require("redis")
var opts = {
   host: process.env.REDIS || 'dockervm.local',
   port: 6379
}


exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/worker',
        handler: Worker
    });

    server.route({
      method: 'GET',
      path: '/clear',
      handler: (req, res) => {
         var client = redis.createClient(opts);
         client.set('pivotalcache', "")
         client.quit()
         res({message: 'done'})
      }
   })


    next();
};


exports.register.attributes = {
    name: 'worker'
};
