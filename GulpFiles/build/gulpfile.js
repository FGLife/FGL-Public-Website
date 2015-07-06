//************BUILD GULP FILE - DOES NOT CONTAIN THE SERVE FEATURE YET v1.0************//
var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssminify = require('gulp-minify-css');
var rename = require('gulp-rename');
var less = require('gulp-less');
/*var LessPluginCleanCSS = require('less-plugin-clean-css'),
 LessPluginAutoPrefix = require('less-plugin-autoprefix'),
 cleancss = new LessPluginCleanCSS({ advanced: true }),
 autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });*/

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

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
gulp.task('fonts', function(){
    var fSrc = 'app/theme/fonts/**/*';
    var fDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/fonts';

    gulp.src(fSrc)
        .pipe(gulp.dest(fDst));
});

//minify images
gulp.task('imagemin', function(){
    var imgSrc = 'app/theme/images/**/*',
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

gulp.task('html',function(){
    var htmlSrc = 'app/theme/*.html';
    var htmlDst = 'build/WebsiteTemplates/CanvasBase/App_Master';

    gulp.src(htmlSrc)
        .pipe(minifyHtml())
        .pipe(gulp.dest(htmlDst));
});

//concatenate, rename, and uglify js files
gulp.task('scripts',function(){
    var jsSrc = 'app/theme/scripts/**/*.js';
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
    var lsSrc = 'app/theme/less/**/responsive.less',
        lsDst = 'build/WebsiteTemplates/CanvasBase/App_Themes/CanvasBase/Styles/';

    return gulp.src(lsSrc)
        .pipe(less())
        .pipe(cssminify({processImport:false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(lsDst));
});
gulp.task('less:dark', function() {
    var lsSrc = 'app/theme/less/**/dark.less',
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


gulp.task('buildTheme',['scripts','fonts','imagemin','less','html'],function(){

});
