module.exports = {


  friendlyName: 'Inspect',


  description: 'Pretty-print any value into a more-readable string.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    value: {
      example: '===',
      description: 'The value that will be formatted into a more-readable string.'
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Inspected value',
      outputDescription: 'A prettified version of the input value.',
      outputExample: '...[{\'foo\': [\'bar\']}]...'
    }

  },


  fn: function(inputs, exits) {

    // Import `util`.
    var util = require('util');

    // Import the `isError` and `isObject` Lodash functions.
    var isError = require('lodash.iserror');
    var isObject = require('lodash.isobject');

    // If the value is an error, output its stack through the `success` exit.
    if (isError(inputs.value)) {
      return exits.success(util.inspect(inputs.value.stack));
    }

    // If the value is an object, output it to infinite(ish) depth through
    // the `success` exit.
    if (isObject(inputs.value)) {
      return exits.success(util.inspect(inputs.value, {depth: null}));
    }

    // Otherwise just run `inspect` on it and output through the `success` exit.
    return exits.success(util.inspect(inputs.value));
  }

};
