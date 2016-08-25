module.exports = {


  friendlyName: 'Hash',


  description: 'Generate unique string from the provided value.',


  extendedDescription: 'Useful for checksums (error-checking) and hash keys (caching, etc.) Uses the crypto module from Node core via `object-hash` on NPM (see http://npmjs.org/package/object-hash)',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    value: {
      example: '*',
      description: 'The value for which to calculate a unique hash string.',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Hashed value',
      outputDescription: 'The unique hash derived from a value.',
      outputExample: 'e003c89cdf35cdf46d8239b4692436364b7259f9'
    }

  },


  fn: function(inputs, exits) {

    throw new Error('Doing this in the next commit');

    // Import `object-hash` as `hashFn`.
    var hashFn = require('object-hash');

    // Hash the input value.
    var hash = hashFn(inputs.value);

    // Return the result through the `success` exit.
    return exits.success(hash);

  },

};
