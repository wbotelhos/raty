module.exports = function(config) {
  config.set({
    autoWatch      : true,
    basePath       : '',
    browsers       : ['Firefox'],
    captureTimeout : 60000,
    colors         : true,
    exclude        : [],
    files          : ['../vendor/jquery.js', '../lib/*.js', 'lib/helper.js', 'lib/jasmine-jquery.js', 'model.js', 'integration.js' ],
    frameworks     : ['jasmine'],
    logLevel       : config.LOG_INFO,
    port           : 9876,
    reporters      : ['progress'],
    singleRun      : true
  });
};
