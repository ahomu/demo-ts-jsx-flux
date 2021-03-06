'use strict';

module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'mocha'],

    files: [
      'test/**/*.js'
    ],

    preprocessors: {
      'test/**/*.js': 'browserify'
    },

    browserify: {
      transform: [
        'espowerify'
      ],
      debug : true
    },

    browsers: ['Chrome'],

    customLaunchers: {
      chromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    autoWatch: true,

    reporters: ['dots', 'coverage'],

    coverageReporter: {
      type: 'text'
    }
  });

  // Custom configuration for Travis-CI
  if (process.env.TRAVIS) {
    config.browsers = ['chromeTravisCI'];
  }
};
