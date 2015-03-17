module.exports = {


  friendlyName: 'Generate random alphanumeric',


  description: 'Generate a random alphanumeric string.  All alphabetical characters will be upper-case.',


  extendedDescription: '',


  sync: true,


  inputs: {

    numChars: {
      description: 'The number of random alphanumeric characters to generate.',
      example: 6,
      defaultsTo: 6
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: '6WE4RT'
    },

  },


  fn: function (inputs,exits) {
    var rdmString = '';
    for( var i=0; i < (inputs.numChars||6); i++) {
      rdmString += Math.random().toString(36).substr(2).toUpperCase();
    }
    return exits.success(rdmString.substr(0, inputs.numChars||6));
  },



};
