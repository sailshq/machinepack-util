module.exports = {


  friendlyName: 'Require',


  description: 'Load (`require()`) a Node.js module located at the specified path and return whatever it exports.',


  extendedDescription:
  'By default, the **require cache will not be cleared**.  To learn more about what that means, '+
  'check out [the section on the require cache in the official Node.js docs](https://nodejs.org/api/modules.html#modules_caching).\n'+
  '\n'+
  'Also note that this method uses the default behavior of `requiree()` in Node.js, so beware of circular/cyclical '+
  'dependencies!  See [Modules/Cycles in the Node.js docs](https://nodejs.org/api/modules.html#modules_cycles) '+
  'for more information.',


  sync: true,


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
      description: 'No module exists at the specified path.'
    },

    couldNotLoad: {
      description: 'A file exists at the specified path, but it could not be loaded as a Node.js module.',
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

    // Attempt to resolve the input path into something `require` can find.
    var absPath;
    try {
      absPath = require.resolve(path.resolve(process.cwd(), inputs.path));
    }
    // If the path couldn't be resolved, leave through `moduleNotFound`.
    catch(e) {
      return exits.moduleNotFound(e);
    }

    // If `inputs.clearCache` is set, clear this path from the require
    // cache before attempting to load.
    if (inputs.clearCache) {
      delete require.cache[require.resolve(absPath)];
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
