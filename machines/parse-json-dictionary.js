module.exports = {
  friendlyName: 'Parse JSON object',
  description: 'Parse an object from a JSON string.',
  extendedDescription: '',
  inputs: {
    json: {
      description: 'The JSON string to parse',
      example: '{"some json": "like this"}',
      required: true
    },
    schema: {
      description: 'An example of what the result object should look like.',
      typeclass: 'dictionary',
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
        return inputs.schema || {};
      }
    }
  },
  fn: function(inputs, exits) {
    return exits.success(JSON.parse(inputs.json));
  },

};
