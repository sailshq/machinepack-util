module.exports = {


  friendlyName: 'Reverse',


  description: 'Build a new array which is an exact clone of `collection`, but in reverse order.',


  extendedDescription: '',


  inputs: {

    collection: {
      friendlyName: 'Array',
      description: 'The array to reverse.',
      typeclass: 'array',
      required: true
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      getExample: function(inputs, env) {
        if (Array.isArray(inputs.collection) && inputs.collection.length) {
          return inputs.collection.reverse();
        }
      }
    }

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');
    return exits.success(inputs.collection.reverse());
  }



};
