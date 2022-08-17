var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var input = './scss/**/*.scss';
var output = './css';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: require('node-normalize-scss').includePaths
};
// ... variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

function task_css() {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
}

function task_css_watch() {
  console.log( 'Building CSSs with Watch' );
  return gulp.watch( './scss/**/*.scss', gulp.series( task_css ) );
}

exports[ "watch" ] = gulp.series(task_css, gulp.parallel( task_css_watch ) );