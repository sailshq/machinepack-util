module.exports = {


  friendlyName: 'While...',


  description: 'Perform an operation over and over until a specified test fails.',


  inputs: {

    test: {
      description: 'The test to run before performing the operation.',
      extendedDescription: 'If this test returns `false`, the machine will trigger its `success` exit.  Otherwise, it will run the operation specifed in the `operation` input, and then try the test again.',
      example: '->',
      contract: {
        inputs: {
          data: {
            description: 'Optional data to send in to the test.',
            like: 'initialData'
          }
        },
        exits: {
          success: {
            friendlyName: 'Test passed',
            description: 'Keep running the `while` loop.',
          },
          stop: {
            friendlyName: 'Test failed',
            description: 'Stop running the `while` loop.',
          },
        },
      },
      required: true
    },

    operation: {
      description: 'The operation to run every time the test returns `true`.',
      example: '->',
      contract: {
        inputs: {
          data: {
            description: 'Optional data to send in to the operation.',
            like: 'initialData'
          }
        },
        exits: {
          success: {
            outputFriendlyName: 'Updated data',
            outputDescription: 'The data to use in the next run of the operation if there is one, or to return when the loop finishes.',
            like: 'initialData'
          }
        },
      },
      required: true
    },

    initialData: {
      description: 'The initial data to send in to the test and (if the test passes) the operation.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Final data',
      outputDescription: 'The final state of the data after the `while` loop is finished.',
      like: 'initialData'
    },

  },


  fn: function(inputs, exits) {

    // Import `async`.
    var async = require('async');

    var data = inputs.initialData;

    async.during(
      function test(cb) {
        inputs.test({data: data}).exec({
          success: function() {
            return cb(null, true);
          },
          stop: function() {
            return cb(null, false);
          },
          error: cb
        });
      },
      function operation(cb) {
        inputs.operation({data: data}).exec({
          success: function(updatedData) {
            data = updatedData;
            return cb();
          },
          error: cb
        });
      },
      function done(err) {
        if (err) {return exits.error(err);}
        return exits.success(data);
      }
    );

  },



};
