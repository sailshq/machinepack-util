module.exports = {


  friendlyName: 'Pluck',


  description: 'Build an array consisting of the values of the `key` property from each element in `collection`.',


  extendedDescription: '',


  inputs: {

    collection: {
      description: 'The array to iterate over.',
      typeclass: 'array',
      required: true
    },

    key: {
      description: 'The key of the property to pluck.',
      example: 'id',
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
          return [inputs.collection[0][inputs.key]];
        }
        return;
      }
    }

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');
    return exits.success(_.pluck(inputs.collection, inputs.key));
  }



};
