let gulp = require('gulp');
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({entries: './web/js/app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./web/js'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./web/js/*.jsx', ['build']);
    gulp.watch('./web/js/*/*.jsx', ['build']);
});

gulp.task('default', ['watch']);
// gulp.task('default');
// gulp.task('default', ['build']);
