var gulp = require('gulp')
, sass = require('gulp-sass')
, coffee = require('gulp-coffee')
, concat = require('gulp-concat')
, uglify = require('gulp-uglify')
, sourcemaps = require('gulp-sourcemaps')
, gutil = require('gulp-util')
, clean = require('gulp-clean')
, runSequence = require('run-sequence')
, config = require('./bower.json')
, fs=require('fs')
, _=require('underscore')
, fexUtil=require('./fex.util.js')
;
_.mixin(require('underscore.string').exports());


var app_name='{appName}'

, bowerComponentFolder='bower_components'
, publicFolder="public"
, publicCssFolder="public/css"
, publicJsFolder="public/js"

, getVendorConfig=function(){
    return fexUtil.getVendorConfiguration(bowerComponentFolder,'./vendor.conf.js',publicFolder);
}
, UnionConfigs=null 

, getUnionConfig=function(){

    if(UnionConfigs){
      return UnionConfigs;
    }
    var copyConfigs=getVendorConfig();
    if(PATH.copy){
        for (var dest in PATH.copy) {
            if(!copyConfigs.others[dest]){
               copyConfigs.others[dest]=PATH.copy[dest];
            }
            else{
               copyConfigs.others[dest]=_.uniq(_.union(copyConfigs.others[dest],PATH.copy[dest]));
            }
        };
    }
    //console.log(copyConfigs);
    return copyConfigs;   
}

, PATH={
    clean:['public','compiled_js'],
    copy:{
        //Fonts
        'public/fonts':['src/fonts/*.{ttf,woff,eof,svg}'],
        //Images
        'public/images':['src/images/*.*'],
        //Views
        'public/':['src/**/*.html']
    },
    compile:{
        scss:['src/scss/*.scss'],
        coffee:{
            scripts:[
              'coffee/*.coffee',
              'coffee/**/*.coffee'
            ],
            tests:['tests/*.coffee','tests/**/*.coffee']
        }
    },
    views:['src/**/*.html']
};

/* clean task
---------------------------------------*/

gulp.task('fex:clean', function() { 
  return gulp.src(PATH.clean).pipe(clean());
});

/* copy task
---------------------------------------*/

gulp.task('fex:copy',function() { 
    var unionConfigs=getUnionConfig();
    for(var dest in unionConfigs.others){
        var src=unionConfigs.others[dest];
        gulp.src(src).pipe(gulp.dest(dest));
    }
});

/* contact task
---------------------------------------*/

gulp.task('fex:concat:css', function() { 
  var unionConfigs=getUnionConfig();
  gulp.src(unionConfigs.stylesheets)
    .pipe(concat(app_name+'.vendors.css'))
    .pipe(gulp.dest(publicCssFolder))
});

gulp.task('fex:concat:js', function() { 
  var unionConfigs=getUnionConfig();
  gulp.src(unionConfigs.scripts)
    .pipe(concat(app_name+'.vendors.min.js'))
    .pipe(gulp.dest(publicJsFolder))
});

/* Compile task
---------------------------------------*/
gulp.task('fex:compile:scss', function() { 
  var files='src/scss/core.scss';//PATH.compile.scss;
  gulp.src(files)
    .pipe(sass())
    .pipe(concat(app_name+'.app.css'))
    .pipe(gulp.dest(publicCssFolder))
});

gulp.task('fex:compile:scripts', function() {
    var files=PATH.compile.coffee.scripts;
    gulp.src(files)
      .pipe(coffee({bare:true}))
      //.pipe(uglify())
      .pipe(gulp.dest('compiled_js/scripts/'))
      .pipe(concat(app_name+'.app.min.js'))
      .pipe(gulp.dest(publicJsFolder)) 
});

gulp.task('fex:compile:tests', function() {
    var files=PATH.compile.coffee.tests;
    gulp.src(files)
      .pipe(coffee({bare:true}))
      .pipe(gulp.dest('compiled_js/tests/'))
});

gulp.task('fex:compile',['fex:compile:scss','fex:compile:scripts','fex:compile:tests']);
gulp.task('fex:concat',['fex:concat:css','fex:concat:js']);

/* build task
---------------------------------------*/

gulp.task('build', function(){
    runSequence('fex:clean','fex:copy','fex:concat','fex:compile',function(){
        UnionConfigs=null;
        setupWatchs();
        console.log('== Finished '+ (new Date()).toTimeString() +' ==');
    });
});

/* watch task
---------------------------------------*/
var watchs=[];
gulp.task('watch', function() {
    setupWatchs();
});

var setupWatchs = function() {
    for (var i in watchs) {
        if(watchs[i]){
          watchs[i].end();
        }
    };
    watchs=[];
    watchs.push(gulp.watch(PATH.compile.coffee.scripts, ['build']));
    watchs.push(gulp.watch(PATH.compile.coffee.tests, ['build']));
    watchs.push(gulp.watch(PATH.compile.scss, ['build']));
    watchs.push(gulp.watch(PATH.views, ['build']));
}

gulp.task('default', ['watch','build']);
