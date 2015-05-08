module.exports = {


  friendlyName: 'Pretty-print',


  description: 'Format any value into a more-readable string.',


  sync: true,


  cacheable: true,


  inputs: {

    value: {
      typeclass: '*',
      required: true,
      description: 'The value that will be formatted into a more-readable string.'
    }

  },


  exits: {

    success: {
      description: 'Done.',
      variableName: 'prettified',
      example: '...[{\'foo\': [\'bar\']}]...'
    }

  },


  fn: function(inputs, exits) {
    return exits.success(require('util').inspect(inputs.value, false, null));
  }

};
