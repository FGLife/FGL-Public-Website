// generated on 2015-07-02 using generator-gulp-webapp 1.0.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

//these are needed for the them builder task
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssminify = require('gulp-minify-css');
var rename = require('gulp-rename');
var less = require('gulp-less');
//end thembuilder task references

//begin themebuilder tasks
//include plug-ins
var jshint = require('gulp-jshint');

//JS hint task
gulp.task('jshint', function(){
  gulp.src('app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/*//uglify minify js
 gulp.task('uglify',function(){
 var jsSrc = 'app/scripts/!**!/!*.js';
 var jsDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/js';

 gulp.src(jsSrc)
 .pipe(gulp.dest(jsDst));
 });*/

//fonts
gulp.task('fontstheme', function(){
  var fSrc = 'app/css/fonts/**/*';
  var fDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/fonts';

  gulp.src(fSrc)
    .pipe(gulp.dest(fDst));
});

//minify images
gulp.task('imagemin', function(){
  var imgSrc = 'app/images/**/*',
    imgDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/Images';

  gulp.src(imgSrc)
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

/*gulp.task('cssmin',function(){
 var cssSrc = 'app/styles/!**!/!*.css',
 cssDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/Styles';

 gulp.src(cssSrc)
 .pipe(cssminify({processImport:false}))
 .pipe(gulp.dest(cssDst));
 });*/

gulp.task('htmltheme',function(){
  var htmlSrc = 'app/*.html';
  var htmlDst = 'build/WebsiteTemplates/CanvasBase/App_Master';

  gulp.src(htmlSrc)
    .pipe(minifyHtml())
    .pipe(gulp.dest(htmlDst));
});

//concatenate, rename, and uglify js files
gulp.task('scripts',function(){
  var jsSrc = 'app/js/**/*.js';
  var jsDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/js';

  gulp.src(jsSrc)
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    .pipe(gulp.dest(jsDst));
});

//preprocess less, minify, and save as css
gulp.task('less', ['less:responsive', 'less:dark']);
gulp.task('less:responsive', function() {
  var lsSrc = 'app/less/**/responsive.less',
    lsDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/Styles/';

  return gulp.src(lsSrc)
    .pipe(less())
    .pipe(cssminify({processImport:false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(lsDst));
});
gulp.task('less:dark', function() {
  var lsSrc = 'app/less/**/dark.less',
    lsDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/Styles/';

  return gulp.src(lsSrc)
    .pipe(less())
    .pipe(cssminify({processImport:false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(lsDst));
});
//commented out due to error
/*gulp.task('less:shortcodes', function() {
 var lsSrc = 'app/less/!**!/shortcodes.less',
 lsDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/Styles/';

 return gulp.src(lsSrc)
 .pipe(less())
 .pipe(cssminify({processImport:false}))
 .pipe(gulp.dest(lsDst));
 });*/


gulp.task('buildtheme',['scripts','fontstheme','imagemin','less','htmltheme'],function(){

});
//end themebuilder tasks


const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/css/*.css')
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/css'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  },
  globals: {
    assert: false,
    expect: false,
    should: false
  }
};

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/css/fonts/**/*'))
    .pipe(gulp.dest('.tmp/css/fonts'))
    .pipe(gulp.dest('dist/css/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/images/**/*',
    '.tmp/css/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/css/**/*.css', ['styles']);
  gulp.watch('app/css/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
