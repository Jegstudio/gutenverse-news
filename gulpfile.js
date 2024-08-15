/**
 * Task to building styles
 */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const mqpacker = require('css-mqpacker');
const path = require('path');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const zip = require( 'gulp-zip' );
const replace = require('gulp-string-replace');
const pot = require('gulp-wp-pot');

const pluginFolder = path.join(__dirname, "./release/gutenverse-news");
const languageFolder = path.join(pluginFolder, '/languages/gutenverse-news.pot');

const postCSSOptions = [
    autoprefixer(),
    mqpacker(), // Gabung media query jadi satu
    cssnano(), // Minify css
];

const sassOptions = {
    includePaths: [path.resolve(__dirname, './src/')],
};

module.exports = {
    postCSSOptions,
    sassOptions,
};


gulp.task('blocks', function () {
    return gulp
        .src([path.resolve(__dirname, './src/assets/scss/blocks.scss')])
        .pipe(sass({ includePaths: ['node_modules'] }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('blocks-styles.css'))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest('gutenverse-news/assets/css/'));
});

gulp.task('build-process', gulp.parallel('blocks'));

gulp.task('build', gulp.series('build-process'));

const watchProcess = (basePath = '.') => {
    gulp.watch([`${basePath}/src/**/*.scss`], gulp.parallel(['blocks']));
};

gulp.task(
    'watch',
    gulp.series('build-process', function watch(done) {
        watchProcess();
        done();
    })
);

gulp.task('clean', function () {
    return del([
        './build/**',
        './release/**',
        './gutenverse-news/assets/js/**',
        './gutenverse-news/assets/css/**',
        './gutenverse-news/languages/**',
        './gutenverse-news/lib/dependencies/**'
    ], {force:true});
});

/**
 * Gulp package release
 */
gulp.task('copy-plugin-folder', function () {
    return gulp
        .src(['./gutenverse-news/**/*', '!./gutenverse-news/lib/framework/**'], { encoding: false })
        .pipe(gulp.dest('./release/gutenverse-news/'));
});

gulp.task('copy-framework', function () {
    return gulp
        .src('./gutenverse-core/framework/**/*', { encoding: false })
        .pipe(gulp.dest('./release/gutenverse-news/lib/framework/'));
});

async function getZip() {
    const zip = await import('gulp-zip');
    return zip.default;
}

gulp.task('zip', async function () {
    const zip = await getZip();

    return gulp
        .src('./release/gutenverse-news/**', { base: './release', encoding: false })
        .pipe(zip('gutenverse-news.zip'))
        .pipe(gulp.dest('./release'));
});

gulp.task('replace-text-domain', function () {
    return gulp
        .src(['./release/gutenverse-news/lib/framework/**/*.js', './release/gutenverse-news/lib/framework/**/*.php'])
        .pipe(replace('--gctd--', 'gutenverse-news'))
        .pipe(gulp.dest('./release/gutenverse-news/lib/framework/'));
});

gulp.task('generate-pot', () => {
    return gulp.src(path.join(pluginFolder, '/**/*.php'))
        .pipe(pot({
            domain: 'gutenverse-news',
            package: 'Gutenverse News',
            team: 'Jegtheme <support@jegtheme.com>',
            gettextFunctions: [
                { name: '__' },
                { name: '_e' },
                { name: '_ex', context: 2 },
                { name: '_n', plural: 2 },
                { name: '_n_noop', plural: 2 },
                { name: '_nx', plural: 2, context: 4 },
                { name: '_nx_noop', plural: 2, context: 3 },
                { name: '_x', context: 2 },
                { name: 'esc_attr__' },
                { name: 'esc_attr_e' },
                { name: 'esc_attr_x', context: 2 },
                { name: 'esc_html__' },
                { name: 'esc_html_e' },
                { name: 'esc_html_x', context: 2 },
            ]
        }))
        .pipe(gulp.dest(languageFolder));
});

gulp.task('release', gulp.series(
    'copy-plugin-folder',
    'copy-framework',
    'replace-text-domain',
    'generate-pot',
    'zip'
));

module.exports.watchProcess = watchProcess;
