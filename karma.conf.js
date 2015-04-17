'use strict';

var istanbul = require('browserify-istanbul');
var isparta = require('isparta');

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
        //istanbul({
        //  instrumenter: isparta
        //}),
        'espowerify'
      ]
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
