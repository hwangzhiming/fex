var bowerConfig = require('./bower.json');

module.exports = function(config){

  var files=[];

  if(bowerConfig.dependencies && bowerConfig.dependencies.cui){
      files=[
      'bower_components/cui/bin/js/cui-vendor.min.js',
      'bower_components/cui/bin/js/cui.min.js'
    ];
  }
  else{
    files=[
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js'
    ];
  }

  files=files.concat([
    'bower_components/angular-mocks/angular-mocks.js',
    'compiled_js/**/*.js',
    'tests/unit/**/*.js'
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