
// carregar configurações do arquivo "package.json"
var config =          require('./package.json');

var gulp =            require('gulp');
var minifyCSS =       require('gulp-csso');   // minificar arquivos ".css"
var uglify =          require('gulp-uglify'); // minificar arquivos ".js"
var concat =          require('gulp-concat');
var less =            require('gulp-less');
var prune =           require('gulp-prune');
var nunjucksRender =  require('gulp-nunjucks-render');

// constantes para uso nas definições (nome de pastas, nomes padrão...)
var src =   config.config.src;
var dest =  config.config.dest; // usar a pasta "/docs" para que o site esteja disponível no GitHub.

// ------------------------------------------------

// definir as funções com os tratamentos iniciais de arquivos
function clean(){
  return gulp.src('').pipe(prune(dest));
}
function css_dev(){
  return gulp.src([
    src+'/libs/**/*.+(less|css)',
    src+'/**/*.+(less|css)'
  ]).pipe(less()).pipe(concat('index.css'));
}
function css(){
  return css_dev().pipe(minifyCSS());
}
function js_dev(){
  return gulp.src([
    src+'/libs/**/*.js',
    src+'/**/*.js',
  ]).pipe(concat('index.js'));
}
function js(){
  return js_dev().pipe(uglify());
}
function html(){
  return gulp.src(src+'/*.+(html|njk|nj|nunjucks)')
              .pipe(nunjucksRender({
                path: [src]
              }));
}

// definir as tarefas no gulp
gulp.task('clean',   function(){ return clean(); });
gulp.task('css-dev', function(){ return css_dev().pipe(gulp.dest(dest)); });
gulp.task('css',     function(){ return css().pipe(gulp.dest(dest)); });
gulp.task('js-dev',  function(){ return js_dev().pipe(gulp.dest(dest)); });
gulp.task('js',      function(){ return js().pipe(gulp.dest(dest)); });
gulp.task('html',    function(){ return html().pipe(gulp.dest(dest)); });

// ------------------------------------------------

// definir as principais tarefas no gulp, as tarefas que estarão "disponíveis" para os
// usuários executarem
gulp.task('help', function(){
  console.log(' Use as tarefas:');
  console.log(' - clean: para limpar a pasta do build final ("'+dest+'")');
  console.log(' - dev: para criar os arquivos sem minificar');
  console.log(' - prod: para criar os arquivos com minificação');
});
gulp.task('default', ['help']);

gulp.task('dev', ['clean', 'css-dev', 'js-dev', 'html']);
gulp.task('prod', ['clean', 'css', 'js', 'html']);

var watchOpts = {
  interval: 700
};
gulp.task('watch', function(){
  //gulp.watch(src+'/**/*.js', watchOpts, ['js-dev']);
  //gulp.watch(src+'/**/*.+(html|njk|nj|nunjucks)', watchOpts, ['html']);
  //gulp.watch(src+'/**/*.+(less|css)', watchOpts, ['css-dev']);
  gulp.watch(src+'/**/*.+(js|html|njk|nj|nunjucks|less|css)', watchOpts, ['dev']);
});
