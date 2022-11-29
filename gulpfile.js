const {src, dest, watch, series, parallel} = require('gulp');
//CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
//const cssnano = require('cssnano');

//Imágenes 
// const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
// const avif = require('gulp-avif');

function css(done) {
    //Compilar sass
    //paso 1: identificar archivo (hoja de estilo de SASS)
    //paso 2: compilar
    //paso 3: guardar el .css

    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        //.pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    done();
};

function images() {
    return src('src/img/**/*.svg')
        .pipe(dest('build/img'));
};
// function images() {
//     return src('src/img/**/*')
//         .pipe(imagemin({optimizationLevel: 3}))
//         .pipe(dest('build/img'));
// };

function toWebp() {
    const options = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img'))
};
// function toAvif() {
//     const options = {
//         quality: 50
//     }
//     return src('src/img/**/*.{png, jpg}')
//         .pipe(avif(options))
//         .pipe(dest('build/img'))
// }

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', images);
};

exports.css = css;
exports.dev = dev;
exports.images =  images;
exports.toWebp = toWebp;
// exports.toAvif = toAvif;
exports.default = series(images, toWebp, css, dev);

//series - Se inician las tareas secuencialmente, esperando que la tarea finalice para comenzar con la siguiente  
//parallel - Todas inician al mismo tiempo