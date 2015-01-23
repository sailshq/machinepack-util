module.exports = {
  friendlyName: 'Add numbers',
  description: 'Compute the sum of two numbers.',
  extendedDescription: '',
  sync: true,
  inputs: {
    a: {
      description: 'The first number.',
      example: 2,
      required: true
    },
    b: {
      description: 'The second number.',
      example: 2.2,
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
      example: 4.2
    }
  },
  fn: function(inputs, exits) {
    return exits.success(inputs.a+inputs.b);
  },

};
