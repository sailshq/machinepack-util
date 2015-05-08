module.exports = {


  friendlyName: 'Run command',


  description: 'Execute a command like you would on the terminal',


  extendedDescription: 'This machine will wait to pass control until the resulting child process exits.',


  inputs: {

    command: {
      friendlyName: 'Command',
      description: 'The command to run.',
      example: 'ls -la',
      required: true
    },

    dir: {
      friendlyName: 'Run from...',
      description: 'The path to the directory from which this process will run.',
      extendedDescription: 'If not set, this input defaults to the present working directory (`pwd`).  Also, if a relative path is provided, it will be resolved relative to `pwd`.',
      example: '/Users/mikermcneil/foo'
    }

  },


  exits: {

    notADir: {
      friendlyName: 'not a directory',
      description: 'The specified path points to a something which is not a directory (e.g. a file or shortcut).'
    },

    noSuchDir: {
      friendlyName: 'no such directory',
      description: 'Cannot run process from the specified path because no such directory exists.'
    },

    success: {
      variableName: 'output',
      description: 'Done.',
      example: {
        stdout: '...',
        stderr: '...'
      },
    },

  },


  fn: function (inputs,exits) {

    var path = require('path');
    var _ = require('lodash');
    var childProcess = require('child_process');


    if (_.isUndefined(inputs.dir)) {
      // Default directory to current working directory
      inputs.dir = process.cwd();
    }
    else {
      // (or if a `dir` was specified, resolve it to make sure
      //  it's an absolute path.)
      inputs.dir = path.resolve(inputs.dir);
    }

    // For reference, docs here:
    // https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
    //
    var runningProc = childProcess.exec(inputs.command, {
      cwd: inputs.dir
    }, function onClose(err, bufferedStdout, bufferedStderr) {
      if (err) {
        if (!_.isObject(err)) {
          return exits.error(err);
        }
        if (err.syscall==='spawn') {
          if (err.code==='ENOTDIR') {
            return exits.notADir();
          }
          if (err.code==='ENOENT') {
            return exits.noSuchDir();
          }
        }
        // console.log('errno',err.errno);
        // console.log('syscall',err.syscall);
        // console.log(_.keys(err));
        // console.log(err.stack);
        // console.log('err code: ' + err.code); // e.g. 127 || 'ENOENT'
        // console.log('Signal received: ' + err.signal); // e.g. 'SIGTERM'
        return exits.error(err);
      }

      // console.log('Child process exited with exit code ' + code);
      return exits.success({
        stdout: bufferedStdout,
        stderr: bufferedStderr
      });
    });
  },



};
