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
;
_.mixin(require('underscore.string').exports());


var app_name='{appName}'

, bowerComponentFolder='bower_components'
, publicFolder="public"
, publicCssFolder="public/css"
, publicJsFolder="public/js"

, getVendorConfig=function(){

    var module = './vendor.conf.js';

    var getFullPathArr=function(prefix,arr){
      var rs;
      if(arr && _.isArray(arr) && arr.length>0){
          rs=[];
          for(var i in arr){
            rs.push(prefix+ _.trim(arr[i],'/'));
          }
      } 
      return rs;
    }

    var configs={
        scripts:[],
        stylesheets:[],
        others:{}
    };
  
    if(fs.existsSync(module)){

      // remove cached module
      delete require.cache[require.resolve(module)];
      //reload module
      var vendorConfigs = require(module);

      for(var pkName in vendorConfigs){
          var conf=vendorConfigs[pkName];
          var pkFolder=bowerComponentFolder+'/'+pkName+'/';
          if(conf.scripts){
              var arr = getFullPathArr(pkFolder,conf.scripts);
              if(arr){
                configs.scripts=_.uniq(_.union(configs.scripts,arr));
              }
          }
          if(conf.stylesheets){
              var arr = getFullPathArr(pkFolder,conf.stylesheets);
              if(arr){
                configs.stylesheets=_.uniq(_.union(configs.stylesheets,arr));
              }
          }
          if(conf.others){
              for(var src in conf.others){
                  var 
                    dest=publicFolder+'/'+_.trim(conf.others[src],'/')
                  , fullSrc=[pkFolder+_.trim(src,'/')]
                  , configDest=configs.others[dest];

                  if(!configDest){
                    configs.others[dest]=fullSrc;
                  }
                  else{
                    configs.others[dest]=_.uniq(_.union(configs.others[dest],fullSrc));
                  }
              }
          }
      }
    }

    return configs;
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
            tests:['tests/**/*.coffee']
        }
    }
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
  var files=PATH.compile.scss;
  gulp.src(files)
    .pipe(sass())
    .pipe(concat(app_name+'.app.css'))
    .pipe(gulp.dest(publicCssFolder))
});

gulp.task('fex:compile:scripts', function() {
    gulp.src(PATH.compile.coffee.scripts)
      .pipe(coffee({bare:true}))
      //.pipe(uglify())
      .pipe(gulp.dest('compiled_js/scripts/'))
      .pipe(concat(app_name+'.app.min.js'))
      .pipe(gulp.dest(publicJsFolder)) 
});

gulp.task('fex:compile:tests', function() {
    gulp.src(PATH.compile.coffee.tests)
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
    });
});

/* watch task
---------------------------------------*/
gulp.task('watch', function() {
  gulp.watch(PATH.compile.coffee.scripts, ['build']);
  gulp.watch(PATH.compile.coffee.tests, ['build']);
  gulp.watch(PATH.compile.scss, ['build']);
});


gulp.task('default', ['watch','build']);
