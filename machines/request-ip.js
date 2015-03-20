module.exports = {
  friendlyName: 'RequestIP',
  description: 'Return the request IP Address',
  extendedDescription: '',
  sync: true,
  cacheable: true,
  inputs: {},
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns the requesters IP Address.',
      example: '127.0.0.1'
    }
  },
  "fn": function(inputs, exits, env) {
    var ip = env.req.headers['x-forwarded-for'] ||
      env.req.connection.remoteAddress ||
      env.req.socket.remoteAddress ||
      env.req.connection.socket.remoteAddress;
    return exits.success(ip);
  },
  "identity": "RequestIP"

};