module.exports = {


  friendlyName: 'Log a message',


  description: 'Output a message to the console',


  sync: true,


  extendedDescription: '',


  inputs: {

    value: {
      typeclass: '*',
      required: true,
      description: 'The value that will be inspected and written to the console.'
    }

  },


  exits: {

    success: {
      description: 'Done.'
    }

  },


  fn: function(inputs, exits) {
    console.log(inputs.value);
    return exits.success();
  }

};
