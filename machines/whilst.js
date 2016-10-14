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

    // Import `async` and `rttc`.
    var async = require('async');
    var rttc = require('rttc');

    // Put a reference to `inputs.initialData` into a var for convenience.
    var data = inputs.initialData;

    // Get an exemplar of the initial value so that we can coerce any
    // updated data to be the same type after each iteration.
    var initialValueTypeSchema = rttc.infer(rttc.coerceExemplar(inputs.initialData));

    // Use `async.during` to perform a fully asynchronous "while" loop
    // (In `async.whilst`, the test must be performed synchronously).
    async.during(
      // Perform the test.  If it passes, the operation will be performed.
      // If it fails, the loop will terminate.
      function test(cb) {
        inputs.test({data: data}).exec({
          // Test passed; return `true` to the callback so that
          // the operation will run.
          success: function() {
            return cb(null, true);
          },
          // Test failed; return `false` to the callback so that
          // the loop will halt.
          stop: function() {
            return cb(null, false);
          },
          // An unknown error occurred; this will short-circuit the loop.
          error: cb
        });
      },
      // Perform the operation.
      function operation(cb) {
        inputs.operation({data: data}).exec({
          // If the operation returned through its `success` exit,
          // update the data and call the callback so that the
          // test will be performed again.
          success: function(updatedData) {

            // Keep track of accumulated result so far, and make sure it validates
            // against the initial value's type.
            data = rttc.coerce(initialValueTypeSchema, updatedData);
            return cb();

          },
          // If the operation returned through its `error` exit,
          // the output from that exit will be passed as the first
          // argument to the callback, thus short-circuiting the loop.
          error: cb
        });
      },
      // The loop has halted, one way or the other.
      function done(err) {
        // If the loop halted due to an unknown error, leave
        // through the `error` exit.
        if (err) {return exits.error(err);}
        // Otherwise output the final state of the data through
        // the `success` exit.
        return exits.success(data);
      }
    );

  },



};
