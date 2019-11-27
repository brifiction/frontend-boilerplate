(() => {

    'use strict';

    /**************** gulpfile.js configuration ****************/

    const

        // development or production
        devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development'),

        // directory locations
        dir = {
            src: 'src/',
            build: 'build/'
        },

        // modules
        gulp = require('gulp'),
        noop = require('gulp-noop'),
        newer = require('gulp-newer'),
        size = require('gulp-size'),
        imagemin = require('gulp-imagemin'),
        sass = require('gulp-sass'),
        postcss = require('gulp-postcss'),
        sourcemaps = devBuild ? require('gulp-sourcemaps') : null,
        browsersync = devBuild ? require('browser-sync').create() : null,
        del = require("del"),
        merge = require("merge-stream");

    console.log('Gulp', devBuild ? 'development' : 'production', 'build');

    /**************** Images task ****************/
    const imgConfig = {
        src: dir.src + 'images/**/*',
        build: dir.build + 'images/',
        minOpts: {
            optimizationLevel: 5
        }
    };

    function images() {

        return gulp.src(imgConfig.src)
            .pipe(newer(imgConfig.build))
            .pipe(imagemin(imgConfig.minOpts))
            .pipe(size({
                showFiles: true
            }))
            .pipe(gulp.dest(imgConfig.build));

    }

    exports.images = images;

    /**************** CSS task ****************/
    const cssConfig = {

        src: dir.src + 'scss/main.scss',
        watch: dir.src + 'scss/**/*',
        build: dir.build + 'css/',
        sassOpts: {
            sourceMap: devBuild,
            imagePath: '/images/',
            precision: 3,
            errLogToConsole: true
        },

        postCSS: [
            require('usedcss')({
                html: ['index.html']
            }),
            require('postcss-assets')({
                loadPaths: ['images/'],
                basePath: dir.build
            }),
            require('autoprefixer')({
                browsers: ['> 1%']
            }),
            require('cssnano')
        ]

    };

    function css() {

        return gulp.src(cssConfig.src)
            .pipe(sourcemaps ? sourcemaps.init() : noop())
            .pipe(sass(cssConfig.sassOpts).on('error', sass.logError))
            .pipe(postcss(cssConfig.postCSS))
            .pipe(sourcemaps ? sourcemaps.write() : noop())
            .pipe(size({
                showFiles: true
            }))
            .pipe(gulp.dest(cssConfig.build))
            .pipe(browsersync ? browsersync.reload({
                stream: true
            }) : noop());

    }

    // Clean vendor
    function clean() {
        return del(["./build/vendor/"]);
    }

    // Bring third party dependencies from node_modules into vendor directory
    function modules() {
        // Bootstrap
        var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
            .pipe(gulp.dest('./build/vendor/bootstrap'));
        // Font Awesome CSS
        var fontAwesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
            .pipe(gulp.dest('./build/vendor/fontawesome-free/css'));
        // Font Awesome Webfonts
        var fontAwesomeWebfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
            .pipe(gulp.dest('./build/vendor/fontawesome-free/webfonts'));
        // jQuery
        var jquery = gulp.src([
                './node_modules/jquery/dist/*',
                '!./node_modules/jquery/dist/core.js'
            ])
            .pipe(gulp.dest('./build/vendor/jquery'));
        // Simple Line Icons
        var simpleLineIconsFonts = gulp.src('./node_modules/simple-line-icons/fonts/**')
            .pipe(gulp.dest('./build/vendor/simple-line-icons/fonts'));
        var simpleLineIconsCSS = gulp.src('./node_modules/simple-line-icons/css/**')
            .pipe(gulp.dest('./build/vendor/simple-line-icons/css'));
        return merge(bootstrap, fontAwesomeCSS, fontAwesomeWebfonts, jquery, simpleLineIconsFonts, simpleLineIconsCSS);
    }

    const vendor = gulp.series(clean, modules);

    exports.css = gulp.series(images, vendor, css);

    /**************** Server task (private) ****************/
    const syncConfig = {
        server: {
            baseDir: './',
            index: 'index.html'
        },
        port: 8000,
        open: false
    };

    // browser-sync
    function server(done) {
        if (browsersync) browsersync.init(syncConfig);
        done();
    }

    // browser-sync reload
    function browserSyncReload(done) {
        browsersync.reload();
        done();
    }

    /**************** watch task ****************/
    function watch(done) {

        // image changes
        gulp.watch(imgConfig.src, images);

        // CSS changes
        gulp.watch(cssConfig.watch, css);

        gulp.watch("./index.html", browserSyncReload);

        done();

    }

    /**************** Default task ****************/
    exports.default = gulp.series(exports.css, watch, server);

})();