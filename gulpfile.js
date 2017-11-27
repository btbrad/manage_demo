var gulp = require('gulp');
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js')
var connect = require('gulp-connect');

// run webpack
gulp.task("webpack", function(callback) {
    var myConfig = Object.create(require('./webpack.config.js'));
    webpack(myConfig, function(err, stats) {
        callback();
    });
});

// gulp.task('webpack', function() {
//   return gulp.src('src/main.js')
//     .pipe(webpack(webpackConfig))
//     .pipe(gulp.dest('dist/'));
// });

// Run the webserver
gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        root: './'
    });
});
