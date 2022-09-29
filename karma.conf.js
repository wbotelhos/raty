module.exports = function (config) {
  'use strict';

  config.set({
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],

    files: [
      { included: false, pattern: 'lib/images/*.png', served: true, watched: false },
      'node_modules/jquery/dist/jquery.min.js',
      'lib/*.css',
      'lib/build/raty.js',
      'spec/vendor/jasmine-jquery.js',
      'spec/helper.js',
      'spec/**/*[sS]pec.js',
    ],

    frameworks: ['jasmine'],
    logLevel: config.LOG_DISABLE,
    singleRun: true,
    proxies: { '/': 'http://localhost:9876/base/lib/images' },
  });
};
