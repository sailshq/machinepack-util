module.exports = {
  friendlyName: 'Divide (÷)',
  description: 'Compute the quotient of two numbers.',
  sync: true,
  inputs: {
    a: {
      description: 'The first number.',
      example: 5,
      required: true
    },
    b: {
      description: 'The second number.',
      example: 2,
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
      example: 2.5
    }
  },
  fn: function(inputs, exits) {
    return exits.success(inputs.a/inputs.b);
  },

};
