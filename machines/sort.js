module.exports = {


  friendlyName: 'Sort',


  description: 'Build a new array which is `collection` sorted by its `key` property.',


  extendedDescription: '',


  inputs: {

    collection: {
      friendlyName: 'Array',
      description: 'The array to sort.',
      typeclass: 'array',
      required: true
    },

    key: {
      friendlyName: 'Sort by...',
      description: 'The property to sort by.',
      example: 'createdAt',
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
          return [inputs.collection[0]];
        }
      }
    }

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');
    return exits.success(_.sortBy(inputs.collection, inputs.key));
  }



};
