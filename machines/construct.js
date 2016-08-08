module.exports = {


  friendlyName: 'Construct value',


  description: 'Create a JSON-serializable value and return it.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value to construct.',
      example: '*',
      constant: true,
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Value',
      like: 'value',
      outputDescription: 'The constructed value.'
    },

  },


  fn: function(inputs, exits) {

    // Simply return the input through the `success` exit, letting
    // RTTC do all the work.
    return exits.success(inputs.value);
  }

};
