var assert = require('assert');
var Util = require('../');

describe('machinepack-util :: require', function() {

  process.chdir(__dirname);

  it('should return through the `success` exit with correct data if the requested module is valid', function() {

    var module;
    try {
      module = Util.require({path: '../node_modules/lodash'}).execSync();
      assert(module.camelCase);
    }
    catch (e) {
      assert(false, e);
    }

  });

  it('should return through the `moduleNotFound` exit if the module path is invalid.', function() {

    var module;
    try {
      module = Util.require({path: '../node_modules/lodashxxx'}).execSync();
      assert(false, 'Returned through the `success` exit but it should have gone through `moduleNotFound`!');
    }
    catch (e) {
      assert.equal(e.exit, 'moduleNotFound', 'Returned through the `' + e.exit + '` exit but it should have gone through `moduleNotFound`!');
    }

  });

  it('should return through the `couldNotLoad` exit if the requested module is invalid', function() {

    var module;
    try {
      module = Util.require({path: '../.gitignore'}).execSync();
      assert(false, 'Returned through the `success` exit but it should have gone through `couldNotLoad`!');
    }
    catch (e) {
      assert.equal(e.exit, 'couldNotLoad', 'Returned through the `' + e.exit + '` exit but it should have gone through `couldNotLoad`!');
    }

  });

  it('should use the require cache if called twice for the same path and `clearCache` is not set', function() {

    var module;
    try {
      module = Util.require({path: './fixtures/require-test-module-1'}).execSync();
      assert.equal(module.abc, 123);
      module.abc = 666;
      try {
        module = Util.require({path: './fixtures/require-test-module-1'}).execSync();
        assert.equal(module.abc, 666);
      }
      catch (e) {
        assert(false, e);
      }

    }
    catch (e) {
      assert(false, e);
    }

  });

  it('should clear the require cache if called twice for the same path and `clearCache` is set', function() {

    var module;
    try {
      module = Util.require({path: './fixtures/require-test-module-2'}).execSync();
      assert.equal(module.foo, 'bar');
      module.foo = 'baz!';
      try {
        module = Util.require({path: './fixtures/require-test-module-2', clearCache: true}).execSync();
        assert.equal(module.foo, 'bar');
      }
      catch (e) {
        assert(false, e);
      }

    }
    catch (e) {
      assert(false, e);
    }

  });

});
