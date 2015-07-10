/*
 * grunt-stylint
 * https://github.com/xdissent/grunt-stylint
 *
 * Copyright (c) 2015 Greg Thornton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    stylint: {
      default_config: {
        options: {
          outputFile: 'tmp/default_config'
        },
        src: ['test/fixtures/test.styl']
      },
      custom_config: {
        options: {
          outputFile: 'tmp/custom_config',
          config: {colons: 'never'}
        },
        src: ['test/fixtures/test.styl']
      },
      no_config_file: {
        options: {
          outputFile: 'tmp/no_config_file',
          configFile: false,
          config: {prefixVarsWithDollar: 'always'}
        },
        src: ['test/fixtures/test.styl']
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'stylint', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
