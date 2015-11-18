/*
 * grunt-stylint
 * https://github.com/xdissent/grunt-stylint
 *
 * Copyright (c) 2015 Greg Thornton
 * Licensed under the MIT license.
 */

'use strict';

var stylint = require('stylint');
var stripJsonComments = require('strip-json-comments');

module.exports = function (grunt) {

  function createWarnings (messages) {
    return color('yellow', messages, '\n\n');
  }

  function color (col, msg, sep) {
    sep = sep || '';
    return grunt.log.wordlist([].concat(msg), {color: col, separator: sep});
  }

  grunt.registerMultiTask('stylint', 'Validate stylus files with stylint', function () {
    var COULD_NOT_FIND_FILES_ERROR = 'Could not find any files.';
    var options = this.options({
      quiet: false,
      configFile: '.stylintrc',
      config: {},
      outputFile: false
    });
    var hasFiles = this.filesSrc.length !== 0;

    // Load config file
    if (options.configFile) {
      var config = grunt.file.read(options.configFile);
      try {
        config = JSON.parse(stripJsonComments(config));
      } catch (err) {
        grunt.log.writeln(color('magenta', 'Could not parse config file.'));
        return false;
      }
      options.config = grunt.util._.extend({}, config, options.config);
    }

    // Fail on empty files list
    if (!options.config.ignoreMissingFiles && !hasFiles) {
      grunt.log.writeln(color('magenta', COULD_NOT_FIND_FILES_ERROR));
      return false;
    }

    // Global success flag and results for each linted file
    var success = true;
    var results = {};

    /**
     * No files - every source should be in results with warning
     */
    if (!hasFiles) {
      grunt.log.writeln(createWarnings(COULD_NOT_FIND_FILES_ERROR));
      this.data.src.map(function (src) {
        results[src] = {
          errors: [],
          warnings: [COULD_NOT_FIND_FILES_ERROR]
        }
      });
    }

    // Lint each file
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

          var hasErrors = this.cache.errs.length > 0;
          var hasWarnings = this.cache.warnings.length > 0;

          // Store success state
          if (success && hasErrors) {
            success = false;
          }

          // Log output
          if (!options.quiet && (hasErrors || hasWarnings)) {
            var out = [];
            if (hasWarnings) {
              out.push(createWarnings(this.cache.warnings));
            }
            if (hasErrors) {
              out.push(color('red', this.cache.errs, '\n\n'));
            }
            grunt.log.writeln(out.join('\n\n'));
          }

          // HACK: reset stylint, since it accidentally shares global state
          this.resetOnChange();
        }
      }).create();
    });

    // Write output file
    if (options.outputFile) {
      grunt.file.write(options.outputFile, JSON.stringify(results));
    }

    return success;
  });

};
