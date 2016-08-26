module.exports = {


  friendlyName: 'Return guaranteed value',


  description: 'Return the first value if it is defined, otherwise the second.',


  extendedDescription: 'Use this machine when you have an uncertain input value (i.e. it may be undefined).  The machine will either output a real, defined value through its `success` exit, or else (if the value was undefined and no default was given) it will return through its `notDefined` exit.',


  moreInfoUrl: 'http://en.wikipedia.org/wiki/Null_coalescing_operator',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    value: {
      description: 'The preferred value to use, if it\'s defined. Must be the same type as the alternate.',
      example: '==='
    },

    defaultValue: {
      friendlyName: 'Default',
      description: 'The backup/alternate value to use in case the preferred value is not defined.',
      extendedDescription: 'If neither `value` nor `default` is defined, the machine will call its `notDefined` exit.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Guaranteed value',
      outputDescription: 'Either the preferred value or the secondary value.',
      like: 'value'
    },

    notDefined: {
      description: 'Neither the preferred value nor the default were defined.'
    }

  },


  fn: function (inputs,exits) {

    // Set the return value to `inputs.value` if it's defined, otherwise
    // set it to `inputs.default`.
    var retVal = typeof inputs.value !== 'undefined' ? inputs.value : inputs.defaultValue;

    // If the return value is still undefined, leave through the `notDefined` exit.
    if (typeof retVal === 'undefined') {
      return exits.notDefined();
    }

    // Return the value through the `success` exit.
    return exits.success(retVal);
  },



};
