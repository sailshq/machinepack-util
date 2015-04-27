module.exports = {
  friendlyName: 'Set Variable',
  description: 'Set a variable. Useful to augment machines which do not output variables.',
  sync: true,
  inputs: {
    value: {
      description: 'The value you wish to save as a variable.',
      typeclass: '*',
      required: true
    },
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      friendlyName: 'Success',
      description: 'OK.',
      getExample: function (inputs, env, input) {
        return inputs.value;
      }
    }
  },
  fn: function (inputs, exits) {
    var result = inputs.value;
    exits.success(result);
  }

};
