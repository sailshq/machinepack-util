module.exports = {


  friendlyName: 'Require',


  description: 'Load (`require()`) a Node.js module located at the specified path and return whatever it exports.',


  extendedDescription:
  'By default, the **require cache will not be cleared**.  To learn more about what that means, '+
  'check out [the section on the require cache in the official Node.js docs](https://nodejs.org/api/modules.html#modules_caching).\n'+
  '\n'+
  'Also note that this method uses the default behavior of `require()` in Node.js, so beware of circular/cyclical '+
  'dependencies!  See [Modules/Cycles in the Node.js docs](https://nodejs.org/api/modules.html#modules_cycles) '+
  'for more information.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    path: {
      description: 'The absolute path to a Node.js module, or the absolute path to the directory of an NPM package.',
      extendedDescription: 'If a relative path is provided, it will be resolved to an absolute path from the context of the current working directory.',
      example: '/code/machinepack-twitter',
      required: true
    },

    clearCache: {
      friendlyName: 'Clear cache?',
      description: 'Whether to clear the requested module from the require cache before attempting to load.',
      example: true,
      defaultsTo: false
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Exports',
      outputDescription: 'The data exported from a Node.js module (usually a function, a machinepack, or a constant.)',
      outputExample: '==='
    },

    moduleNotFound: {
      description: 'No module could be found at the specified path.'
    },

    couldNotLoad: {
      description: 'A file was found at the specified path, but it could not be loaded as a Node.js module.',
      extendedDescription:
      'This usually means that either the module has bugs (e.g. trying to require a module with a typo), '+
      'or that the file at the specified path is not actually a Node.js module at all (e.g. trying to '+
      'require a stylesheet, or a PHP file). See the JavaScript error returned from this exit for more '+
      'information.',
      outputFriendlyName: 'Error',
      outputDescription: 'A JavaScript Error with more information about why this `require()` failed.',
      outputExample: '==='
    }

  },

  fn: function (inputs, exits) {

    // Import `path`.
    var path = require('path');

    // Import `lodash` and `resolve`
    var _ = require('lodash');
    var resolve = require('resolve');

    // Look for the requested module using `resolve`, so that we can get the correct location
    // relative to the current working directory (as opposed to being relative to the location
    // of machinepack-utils).
    var absPath;

    try {
      absPath = resolve.sync(inputs.path, {basedir: process.cwd()});
    }

    // If the path couldn't be resolved, leave through `moduleNotFound`.
    catch(eCouldNotResolvePath) {
      return exits.moduleNotFound(eCouldNotResolvePath);
    }

    // If `inputs.clearCache` is set, clear this path AND ALL CHILDREN from the require
    // cache before attempting to load.
    if (inputs.clearCache) {
      // First, see if the item is actually cached.
      if (require.cache[absPath]) {
        // If so, add it to a stack of modules to remove.
        var modulesToRemove = [require.cache[absPath]];
        // While there are items in the stack...
        while (modulesToRemove.length) {
          // Pop a module off the stack.
          var moduleToRemove = modulesToRemove.pop();
          // Add its children to the stack.
          var children = (require.cache[moduleToRemove.id] && require.cache[moduleToRemove.id].children) || [];
          modulesToRemove = modulesToRemove.concat(children);
          // Delete the module from the cache.
          delete require.cache[moduleToRemove.id];
        }
      }
    }

    // Attempt to require the module.
    try {
      var result = require(absPath);
      // If successful, output the module through the `success` exit.
      return exits.success(result);
    }
    catch (e) {
      // If the module could not be found, leave through `moduleNotFound`.
      if (e.code === 'MODULE_NOT_FOUND') { return exits.moduleNotFound(e); }
      // Otherwise leave through `couldNotLoad`.
      else { return exits.couldNotLoad(e); }
    }

  }


};
