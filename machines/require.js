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
      example: '/code/machinepack-twitter',
      description: 'The absolute path to a Node.js module, or to the directory of an NPM package.',
      extendedDescription: 'If a relative path is provided, it will be resolved to an absolute path from the context of the current working directory.',
      required: true
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
    var path = require('path');

    var absPath = path.resolve(process.cwd(), inputs.path);
    try {
      var result = require(absPath);
      return exits.success(result);
    }
    catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') { return exits.moduleNotFound(e); }
      else { return exits.couldNotLoad(e); }
    }
  }


};
