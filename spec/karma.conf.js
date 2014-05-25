module.exports = function(config) {
  config.set({
    autoWatch      : true,
    basePath       : '',
    browsers       : ['Firefox'],
    captureTimeout : 60000,
    colors         : true,
    exclude        : [],
    files          : ['../demo/javascripts/jquery.js', '../lib/*.js', 'lib/helper.js', 'lib/jasmine-jquery.js', 'spec.js' ],
    frameworks     : ['jasmine'],
    logLevel       : config.LOG_INFO,
    port           : 9876,
    reporters      : ['progress'],
    singleRun      : true
  });
};
