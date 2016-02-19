
var Hoek = require('hoek');
var Version = require('../package.json').version
var redis = require("redis")
// var config = require('../config');
// var Env = config.get('/app/env/')
// var settings = config.get({env: Env}, '/app/')



exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            var opts = {
               host: process.env.REDIS || 'dockervm.local',
               port: 6379
            }
            var client = redis.createClient(opts);

            client.get("key1", function(err, res){
               obj = (res)? JSON.parse(res): { number: 0 };
               obj.number++
               client.set("key1", JSON.stringify(obj), redis.print);
               client.quit()
               reply({
                  settings: 'ghllo',
                  counter: (res)? JSON.parse(res): { number: 0 }
               });
            })

        }
    });

    server.route({
      method: 'GET',
      path: '/version',
      handler: function(request, reply) {
         reply({ version: Version })
      }
    })


    next();
};


exports.register.attributes = {
    name: 'api'
};
