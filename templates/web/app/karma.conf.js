var bowerConfig = require('./bower.json')
, fexUtil=require('fex-util')
;

module.exports = function(config){

  var VendorConfig=fexUtil.getVendorConfiguration('bower_components',__dirname+'/vendor.conf.js','public');

  var files=VendorConfig.scripts.concat([
    'bower_components/angular-mocks/angular-mocks.js',
    'compiled_js/**/*.js',
  ]);

  config.set({

    basePath : './',

    files : files,

    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    reporters: ['progress', 'junit'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],
    junitReporter : {
      outputFile: 'test_results/karma_unit.xml',
      suite: 'unit'
    }

  });
};