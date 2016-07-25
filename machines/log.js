module.exports = {


  friendlyName: 'Log a message',


  description: 'Output a message to the console.',


  sync: true,


  inputs: {

    value: {
      description: 'The value that will be written to the console.',
      example: '==='
    }

  },


  fn: function(inputs, exits) {
    console.log(inputs.value);
    return exits.success();
  }

};
