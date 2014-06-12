module.exports = function(config) {
  config.set({
    autoWatch      : true,
    basePath       : '',
    browsers       : ['Firefox'],
    captureTimeout : 60000,
    colors         : true,
    exclude        : [],
    files          : ['../vendor/*.js', '../lib/*.js', 'lib/jasmine-jquery.js', 'lib/helper.js', 'options_spec.js', '*spec.js' ],
    frameworks     : ['jasmine'],
    logLevel       : config.LOG_INFO,
    port           : 9876,
    reporters      : ['progress'],
    singleRun      : true
  });
};
