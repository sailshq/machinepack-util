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
    var util = require('util');
    var isError = require('lodash.iserror');
    var isObject = require('lodash.isobject');

    if (isError(inputs.value)) {
      return exits.success(util.inspect(inputs.value.stack));
    }
    if (isObject(inputs.value)) {
      return exits.success(util.inspect(inputs.value, {depth: null}));
    }
    return exits.success(util.inspect(inputs.value));
  }

};
