module.exports = {
  friendlyName: 'Multiply (✕)',
  description: 'Compute the product of an array of numbers.',
  extendedDescription: '∏(i[0], i[1], ..., i[n])',
  sync: true,
  inputs: {
    numbers: {
      description: 'The numbers to multiply.',
      example: [-425.2],
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
    var product = 1;
    for (var i=0;i<inputs.numbers.length;i++){
      product = product * inputs.numbers[i];
    }
    return exits.success(product);
  },

};
