module.exports = {


  friendlyName: 'Pretty print',


  description: 'Pretty print any value into a more-readable string.',


  extendedDescription: 'This is like `util.inspect()` from Node.js.',


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
      outputFriendlyName: 'Pretty value',
      outputDescription: 'The pretty printed value.',
      extendedDescription:
      'If the value was an Error instance, it was converted to a string by grabbing its `stack` property.  '+
      'Otherwise, `util.inspect()` was used.  If the value was an object of any kind (e.g. dictionary, array, '+
      'a Date instance, whatever) `util.inspect()` is called with `{depth: null}`.',
      outputExample: '...[{\'foo\': [\'bar\']}]...'
    }

  },


  fn: function(inputs, exits) {

    // Import `util`.
    var util = require('util');

    // Import the `isError` and `isObject` Lodash functions.
    var isError = require('lodash').isError;
    var isObject = require('lodash').isObject;

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
