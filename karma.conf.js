module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch: true,
    browsers:  ['Chrome', 'Firefox'],

    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'lib/*.css',
      'lib/*.js',
      'spec/vendor/jasmine-jquery.js',
      'spec/lib/helper.js',
      'spec/**/*[sS]pec.js'
    ],

    frameworks: ['jasmine'],
    logLevel:   config.LOG_DISABLE,
    singleRun:  true
  });
};
