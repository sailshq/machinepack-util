module.exports = {


  friendlyName: 'Hash',


  description: 'Generate a unique, deterministic string from the provided value.',


  extendedDescription:
  'Useful for checksums (error-checking) and hash keys (caching, etc.)  '+
  'Uses the `crypto` module from Node core via the same strategy as in the machine runner itself,  '+
  '(see http://npmjs.org/package/machine)\n'+
  'Regardless of how deeply nested a dictionary is in the provided value, _key order does not matter_ '+
  'when computing this hash string.',


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

    // Import SHA1 encryptor from `crypto-js`.
    var crypto = require('crypto-js/sha1');

    // Import `lodash`.
    var _ = require('lodash');

    // --•
    // At this point, since we can safely assume `inputs.value` has already been validated,
    // we can safely trust that it is JSON-serializable.

    // Build a modified ("deep-ish") clone of this value with all of its keys sorted-- recursively deep.
    var sortifiedValue = (function _sortKeysRecursive(val){

      // --• misc
      if (!_.isObject(val)) { return val; }

      // --• array
      if (_.isArray(val)) {
        return _.map(val, function (item){
          return _sortKeysRecursive(item);
        });//</_.map()>
      }

      // --• dictionary
      var sortedSubKeys = _.keys(val).sort();
      return _.reduce(sortedSubKeys, function (memo, subKey) {
        memo[subKey] = _sortKeysRecursive(val[subKey]);
        return memo;
      }, {});//</_.reduce()>

    })(inputs.value);//</invoked self-calling recursive function :: _sortKeysRecursive()>

    // Now encode that as a JSON string.
    var sortedAndStringifiedValue = JSON.stringify(sortifiedValue);

    // Finally, compute & return a SHA1 hash.
    var hash = crypto(sortedAndStringifiedValue).toString();

    // Return the result through the `success` exit.
    return exits.success(hash);

  }


};

