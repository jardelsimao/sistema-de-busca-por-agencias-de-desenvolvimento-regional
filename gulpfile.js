// Definimos o diretório dos arquivos para evitar repetição futuramente
 
// Todos os arquivos CSS que serão compactados
// Explicação: /*.css busca todos os arquivos css de uma pasta, /**/*.css busca todos os arquivos css de uma pasta e sub pasta.
var css = [
 './css-source/vendor/bootstrap/*.css',
 './css-source/vendor/Angu/*.css',
 './css-source/style.css'
];
 
// Todos os arquivos JS que serão compactados
// Explicação: /*.js busca todos os arquivos css de uma pasta, /**/*.js busca todos os arquivos js de uma pasta e sub pasta.
var js  = [
    './js-source/vendor/jquery/*.js',    
    './js-source/vendor/angular/*.js',
    './js-source/vendor/Angu/*.js',
    './js-source/vendor/bootstrap/*.js', 
    './js-source/main.js',
    './js-source/controller/*.js'
];
 
// Núcleo do Gulp
var gulp = require('gulp');
 
// Transforma o javascript em formato ilegível para humanos
var uglify = require("gulp-uglify");
 
// Agrupa todos os arquivos em um
var concat = require("gulp-concat");
 
// Verifica alterações em tempo real, caso haja, compacta novamente todo o projeto 
var watch = require('gulp-watch');
 
// Minifica o CSS
var cssmin = require("gulp-cssmin");
 
// Remove comentários CSS
var stripCssComments = require('gulp-strip-css-comments');

// Gerenciamento do browser -  realtime
var browserSync             = require('browser-sync');
var reload                  = browserSync.reload;

// Plugin para mostrar mensagens no sistema
var notify = require('gulp-notify');
 
// Processo que agrupará todos os arquivos CSS, removerá comentários CSS e minificará.
gulp.task('minify-css', function(){
    gulp.src(css)
    .pipe(concat('style.min.css'))
    .pipe(stripCssComments({all: true}))
    .pipe(cssmin())
    .pipe(gulp.dest('./css/'))
    .pipe(notify({message: "CSS tasks complete"}))
    .pipe(notify({message: "Aplicação Online"}));
    
});
 
// Tarefa de minificação do Javascript
gulp.task('minify-js', function () {
    gulp.src(js)                        // Arquivos que serão carregados, veja variável 'js' no início
    .pipe(concat('script.min.js'))      // Arquivo único de saída
    .pipe(uglify({mangle: false}))                     // Transforma para formato ilegível
    .pipe(gulp.dest('./js/'))
    .pipe(notify({message: "JS tasks complete"}));
});

// Tarefa de monitoração caso algum arquivo seja modificado, deve ser executado e deixado aberto, comando "gulp watch".
gulp.task('watch', function() {
    gulp.watch(js, ['minify-js']);
    gulp.watch(css, ['minify-css']);
});

gulp.task('browser-sync', function() {  
    browserSync.init(['./css/*', './js/*','./index.html'], {
        server: {
            baseDir: "./"
        }
    });
});

// Tarefa padrão quando executado o comando GULP
gulp.task('default',['minify-js','minify-css','watch','browser-sync']);
