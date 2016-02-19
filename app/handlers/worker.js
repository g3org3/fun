
var Waterfall = require('async-waterfall')
var Needle = require('needle')
var Internals = {}
var redis = require("redis")
var opts = {
   host: process.env.REDIS || 'dockervm.local',
   port: 6379
}

module.exports = function (request, reply) {
   console.log("entro al worker")
   var token = process.env.PIV_TOKEN

    Waterfall([
      function (next) {
         Internals.getCache(next)
      },
      function(info, next) {
         if (info.cache) {
            console.log("1")
            return reply(info.value)
         }
         else {
            next(null, true)
         }
      },
      function(value, next) {
         Internals.getInfo(token,next)
      }
   ], function (err, response) {
      if (err) {
         console.log("2")
         return reply(Boom.badRequest(err.message))
      }
      console.log("4")
      return reply(response)
   })
}

Internals.getInfo = (token, next) => {
   console.log("CALLING PIVOTAL")
   var options = {
      headers: {
         'X-TrackerToken': token
      }
   }
   Needle.get('https://www.pivotaltracker.com/services/v5/me', options, function(err, res) {

      if (err) {
         next(err)
      }
      else {
         var client = redis.createClient(opts);
         client.set('pivotalcache', JSON.stringify(res.body))
         client.quit()
         next(null, res.body)
      }
   })
}


Internals.getCache = (next) => {

   var client = redis.createClient(opts);
   client.get("pivotalcache", function(err, res){
      if (err) {
         client.quit();
         return next(err)
      }
      if (res) {
         console.log("return caching")
         var cache = JSON.parse(res)
         client.quit();
         return next(null, {cache:true, value:cache})
      }
      else {
         client.quit();
         return next(null, {cache:false})
      }
   })
}
