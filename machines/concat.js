module.exports = {
  friendlyName: 'Combine strings',
  description: 'Concatenate an array of strings into one new string.',
  extendedDescription: '',
  sync: true,
  cacheable: true,
  inputs: {
    strings: {
      description: 'The array of strings to join',
      example: ['foo'],
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns the concatenated result.',
      example: 'foo'
    }
  },
  fn: function(inputs, exits) {
    var result = '';
    for (var i = 0; i < inputs.strings.length; i++){
      result += inputs.strings[i];
    }
    return exits.success(result);
  },

};
