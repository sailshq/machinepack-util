var assert = require('assert');
var Util = require('../');
var path = require('path');

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

  describe('resolving from working directory', function() {
    var cwd;
    before(function() {
      cwd = process.cwd();
      process.chdir(path.resolve(__dirname, 'fixtures', 'module'));
    });
    after(function() {
      process.chdir(cwd);
    });

    it('should be able to resolve modules with no path info from the current working directory', function() {

      var module, module2, module3;
      try {
        module = Util.require({path: 'colors'}).execSync();
        assert(module);
        assert(module.styles);
        module.foo = 'baz!';
        try {
          module2 = Util.require({path: 'colors'}).execSync();
          assert.equal(module2.foo, 'baz!', 'Should have retrieved cached module, but could not find the var we set!');
        }
        catch (e) {
          assert(false, e);
        }
        try {
          module3 = Util.require({path: 'colors', clearCache: true}).execSync();
          assert.equal(typeof module3.foo, 'undefined', 'Should have cleared cached, but the retrieved module still had the var we set!');
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



});
