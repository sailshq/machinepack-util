module.exports = {


  friendlyName: 'Get calculated value',


  description: 'Get a value calculated by an anonymous machine (a "getter").',


  inputs: {

    resultExemplar: {
      friendlyName: 'Example result',
      description: 'An example of what the calculated value with look like.',
      isExemplar: true,
      defaultsTo: '*'
    },

    getter: {
      description: 'The machine used to calculate the value.',
      example: '->',
      contract: {
        inputs: {},
        exits: {
          success: {
            outputFriendlyName: 'Value',
            outputDescription: 'The calculated value.',
            like: 'resultExemplar'
          }
        },
      },
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Value',
      like: 'resultExemplar',
      outputDescription: 'The calculated value.'
    },

  },


  fn: function(inputs, exits) {

    // Run the getter and output the value through the `success` exit
    // unless an error occurs.
    inputs.getter().exec({
      success: exits.success,
      error: exits.error
    });

  }

};
