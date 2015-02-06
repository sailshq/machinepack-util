module.exports = {
  friendlyName: 'Hash dictionary',
  description: 'Generate unique hash string from dictionary.',
  extendedDescription: '',
  inputs: {
    dictionary: {
      typeclass: 'dictionary',
      description: 'The object from which the unique string hash will be calculated.',
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.',
      example: 'b239c39-ab23851-13850be01-193104e81b19f'
    }
  },
  fn: function(inputs, exits) {

    var hashFn = require('object-hash');

    var hash = hashFn(getUniquelyIdentifyingObj(machine));
    return exits.success(hash);

  },

};
