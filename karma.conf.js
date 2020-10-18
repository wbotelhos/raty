module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch: true,
    browsers:  ['Chrome', 'Firefox'],

    files: [
      'vendor/*.js',
      'lib/*.css',
      'lib/*.js',
      'spec/vendor/jasmine-jquery.js',
      'spec/lib/helper.js',
      'spec/*spec.js'
    ],

    frameworks: ['jasmine'],
    logLevel:   config.LOG_ERROR,
    singleRun:  true
  });
};
