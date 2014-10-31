var gulp = require('gulp')
, sass = require('gulp-sass')
, coffee = require('gulp-coffee')
, concat = require('gulp-concat')
, uglify = require('gulp-uglify')
, sourcemaps = require('gulp-sourcemaps')
, gutil = require('gulp-util')
, clean = require('gulp-clean')
, runSequence = require('run-sequence')
, config = require('./bower.json');
;

var app_name='{appName}';

var paths = {
  vendors: {
    scripts:[],
    styles:[]
  },
  coffees:[
    'coffee/*.coffee',
    'coffee/**/*.coffee'
  ],
  scss:[
     'src/scss/*.scss'
  ],
  fonts:[
    'src/fonts/*.{ttf,woff,eof,svg}'
  ],
  views:[
    'src/**/*.html'
  ],
  images:['src/images/*.*']
};

if(config.dependencies && config.dependencies.cui){
    paths.vendors.scripts=paths.vendors.scripts.concat([
      'bower_components/cui/bin/js/cui-vendor.js',
      'bower_components/cui/bin/js/cui.js'
    ]);
    paths.vendors.styles=paths.vendors.styles.concat(['bower_components/cui/bin/css/cui.css']);
    paths.fonts=paths.fonts.concat(['bower_components/cui/bin/css/fonts/*.{ttf,woff,eof,svg}']);
}
else{
    paths.vendors.scripts=paths.vendors.scripts.concat([
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js'
    ]);
}

gulp.task('clean', function() { 
  return gulp.src(['public','compiled_js']).pipe(clean());
});

gulp.task('vendors:scripts',function() { 
  gulp.src(paths.vendors.scripts)
    .pipe(concat(app_name+'.vendors.min.js'))
    .pipe(gulp.dest('public/js'))
});

gulp.task('coffee',['vendors:scripts'],function() { 
  gulp.src(paths.coffees)
    .pipe(coffee({bare:true}))
    .pipe(uglify())
    .pipe(gulp.dest('compiled_js/'))
    .pipe(concat(app_name+'.app.min.js'))
    .pipe(gulp.dest('public/js'))
});

//Compile Sass
gulp.task('sass',['vendors:styles'],function() { 
   
  gulp.src(paths.scss)
    .pipe(sass())
    .pipe(concat(app_name+'.app.css'))
    .pipe(gulp.dest('public/css'))
});

//Compile Sass
gulp.task('vendors:styles',function() {

  gulp.src(paths.vendors.styles)
    .pipe(concat(app_name+'.vendors.css'))
    .pipe(gulp.dest('public/css'))
});

/* Copy Items
--------------------------------------------*/

//Copy fonts to public folder
gulp.task('copyfonts',function() {
   
  gulp.src(paths.fonts)
    .pipe(gulp.dest('public/css/fonts'));
});

//Copy images to public folder
gulp.task('copyimages',function() {
   
  gulp.src(paths.images)
    .pipe(gulp.dest('public/images/'));
});

gulp.task('copyviews', function() {
   
  gulp.src(paths.views)
    .pipe(gulp.dest('public/'));
});


gulp.task('watch', function() {
  gulp.watch(paths.coffees, ['build']);
  gulp.watch(paths.scss, ['build']);
  gulp.watch(paths.views, ['build']);
});

gulp.task('copy', ['copyfonts','copyimages','copyviews']);

gulp.task('default', ['watch','build']);

gulp.task('build', function(cb){
  runSequence('clean','copy','sass','coffee',cb);
});