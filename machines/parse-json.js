module.exports = {
  friendlyName: 'Parse JSON',
  description: 'Parse data from a JSON string.',
  extendedDescription: '',
  sync: true,
  inputs: {
    json: {
      description: 'The JSON string to parse',
      example: '{"some json": "like this"}',
      required: true
    },
    schema: {
      description: 'An example of what the resulting data should look like.',
      typeclass: '*',
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
      getExample: function (inputs){
        return inputs.schema;
      }
    }
  },
  fn: function(inputs, exits) {
    return exits.success(JSON.parse(inputs.json));
  },

};
