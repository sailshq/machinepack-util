module.exports = {
  friendlyName: 'Multiply (✕)',
  description: 'Multiply two numbers and return the product.',
  extendedDescription: '',
  sync: true,
  inputs: {
    inputs: {
      a: {
        description: 'The first number.',
        example: 2,
        required: true
      },
      b: {
        description: 'The second number.',
        example: -10,
        required: true
      }
    },
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns the product (a ✕ b)',
      example: 4.2
    }
  },
  fn: function(inputs, exits) {
    var product = 1;
    for (var i=0;i<inputs.numbers.length;i++){
      product = product * inputs.numbers[i];
    }
    return exits.success(product);
  },

};
