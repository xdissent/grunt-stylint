/*
 * grunt-stylint
 * https://github.com/xdissent/grunt-stylint
 *
 * Copyright (c) 2015 Greg Thornton
 * Licensed under the MIT license.
 */

'use strict';

var stylint = require('stylint');

module.exports = function (grunt) {

  function color (col, msg, sep) {
    sep = sep || '';
    return grunt.log.wordlist([].concat(msg), {color: col, separator: sep});
  }

  grunt.registerMultiTask('stylint', 'Validate stylus files with stylint', function () {

    var options = this.options({
      quiet: false,
      configFile: '.stylintrc',
      config: {},
      outputFile: false
    });

    if (options.configFile) {
      var config = grunt.file.readJSON(options.configFile);
      options.config = grunt.util._.extend({}, config, options.config);
    }

    if (this.filesSrc.length === 0) {
      grunt.log.writeln(color('magenta', 'Could not find any files.'));
      return false;
    }

    var success = true;
    var results = {};

    this.filesSrc.forEach(function (file) {
      stylint(file, options.config).methods({
        read: function () {
          this.cache.filesLen = 1;
          this.cache.fileNo = 1;
          this.cache.file = file;
          this.cache.files = [file];
          this.parse(null, [grunt.file.read(file)]);
        },
        done: function () {
          results[file] = {
            errors: this.cache.errs.slice(),
            warnings: this.cache.warnings.slice()
          };
          if (success && this.cache.errs.length > 0) {
            success = false;
          }
          if (!options.quiet) {
            grunt.log.writeln([color('yellow', this.cache.warnings, '\n\n'),
              color('red', this.cache.errs, '\n\n')].join('\n\n'));
          }
          // HACK: reset stylint, since it accidentally shares global state
          this.resetOnChange();
        }
      }).create();
    });

    if (options.outputFile) {
      grunt.file.write(options.outputFile, JSON.stringify(results));
    }

    return success;
  });

};
