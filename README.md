# grunt-stylint

> Validate stylus files with stylint

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-stylint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-stylint');
```

## The "stylint" task

### Overview
In your project's Gruntfile, add a section named `stylint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  stylint: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.quiet
Type: `Boolean`
Default value: `false`

A boolean flag to disable all output.

#### options.configFile
Type: `String|Boolean`
Default value: `.stylintrc`

The path to a stylint config file, or `false` to disable config file loading.

#### options.config
Type: `Object`
Default value: `{}`

A custom stylint config which will be merged with the config file.

#### options.outputFile
Type: `String|Boolean`
Default value: `false`

Optionally write JSON stylint results to a file.

### Usage Examples

#### Default Options
In this example, the stylint config will be loaded from `.stylintrc`.

```js
grunt.initConfig({
  stylint: {
    src: ['src/**/*.styl']
  }
});
```

#### Custom Config
In this example, a custom stylint config is merged with the config found in `.stylintrc`.

```js
grunt.initConfig({
  stylint: {
    options: {
      config: {colons: 'never'}
    },
    src: ['src/**/*.styl']
  },
});

#### Custom Config File
In this example, a custom stylint config file is used.

```js
grunt.initConfig({
  stylint: {
    options: {
      configFile: 'config/stylint.json'
    },
    src: ['src/**/*.styl']
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
