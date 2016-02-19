
var Hoek = require('hoek');
var Version = require('../package.json').version

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply({ message: 'Welcome to the plot device.' });
        }
    });

    server.route({
      method: 'GET',
      path: '/version',
      handler: function(request, reply) {
         reply({ version: version })
      }
    })


    next();
};


exports.register.attributes = {
    name: 'api'
};
