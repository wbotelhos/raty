module.exports = function (config) {
  'use strict';

  config.set({
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],

    files: [
      { included: false, pattern: 'src/images/*.png', served: true, watched: false },
      { included: false, pattern: 'src/fonts/*', served: true, watched: false },
      'node_modules/jquery/dist/jquery.min.js',
      'src/*.css',
      'build/raty.js',
      'spec/vendor/jasmine-jquery.js',
      'spec/helper.js',
      'spec/**/*[sS]pec.js',
    ],

    frameworks: ['jasmine'],
    logLevel: config.LOG_DISABLE,
    singleRun: true,
    proxies: { '/': 'http://localhost:9876/base/src/images' },
  });
};
