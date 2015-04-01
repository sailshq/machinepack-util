module.exports = {


  friendlyName: 'Pluck',


  description: 'Gets the value of key from all elements in collection.',


  extendedDescription: '',


  inputs: {

    collection: {
      description: 'The collection to iterate over.',
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
        if (Array.isArray(inputs.collection)) {
            return [inputs.collection[0][inputs.property]];
        }
        return undefined;
      }
    }

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');
    return exits.success(_.pluck(inputs.collection, inputs.key));
  }



};
