'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.stylint = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_config: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_config');
    var expected = grunt.file.read('test/expected/default_config');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_config: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_config');
    var expected = grunt.file.read('test/expected/custom_config');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
  no_config_file: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/no_config_file');
    var expected = grunt.file.read('test/expected/no_config_file');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};
