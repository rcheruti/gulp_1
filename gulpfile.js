
// carregar configurações do arquivo "package.json"
var config =          require('./package.json');

var gulp =            require('gulp');
var minifyCSS =       require('gulp-csso');     // minificar arquivos ".css"
var uglify =          require('gulp-uglify');   // minificar arquivos ".js"
var htmlmin =         require('gulp-htmlmin');  // minificar arquivos ".html"
var concat =          require('gulp-concat');   // concatenar arquivos de texto
var less =            require('gulp-less');     // compilar arquivos ".less" para ".css"
var prune =           require('gulp-prune');    // apagar arquivos de diretórios
var nunjucksRender =  require('gulp-nunjucks-render');  // compilar arquivos ".njk" para ".html"
var flatten =         require('gulp-flatten');  // remove os diretórios das 'listas' de arquivos do Gulp

// constantes para uso nas definições (nome de pastas, nomes padrão...)
var src =   config.config.src;
var dest =  config.config.dest; // usar a pasta "/docs" para que o site esteja disponível no GitHub.

// configuração de arquivos que devem ser carregados antes dos demais durante a compilação
var orderJs =  [];
var orderCss = [];
var order =    config.config.order;
if( order ){
  if( order.js && order.js.length ){
    orderJs = order.js.map((v) => src + v);
  }
  if( order.css && order.css.length ){
    orderCss = order.css.map((v) => src + v);
  }
}

// ------------------------------------------------

// definir as funções com os tratamentos iniciais de arquivos
function clean(){
  return gulp.src('').pipe(prune(dest));
}
function css_dev(){
  var itens = orderCss.concat([
    src+'/libs/**/*.+(less|css)',
    src+'/**/*.+(less|css)'
  ]);
  return gulp.src(itens).pipe(less()).pipe(concat('index.css'));
}
function css(){
  return css_dev().pipe(minifyCSS());
}
function js_dev(){
  var itens = orderJs.concat([
    src+'/libs/**/*.js',
    src+'/**/*.js',
  ]);
  return gulp.src(itens).pipe(concat('index.js'));
}
function js(){
  return js_dev().pipe(uglify());
}
function html_dev(){
  return gulp.src(src+'/paginas/**/*.+(html|njk|nj|nunjucks|svg)')
              .pipe(nunjucksRender({
                path: [src],
                envOptions: {
                  noCache: true
                }
              }))
              .pipe(flatten());
}
function html(){
  return html_dev().pipe(htmlmin({collapseWhitespace: true}));
}

// definir as tarefas no gulp
gulp.task('clean',    function(){ return clean(); });
gulp.task('css-dev',  function(){ return css_dev().pipe(gulp.dest(dest)); });
gulp.task('css',      function(){ return css().pipe(gulp.dest(dest)); });
gulp.task('js-dev',   function(){ return js_dev().pipe(gulp.dest(dest)); });
gulp.task('js',       function(){ return js().pipe(gulp.dest(dest)); });
gulp.task('html-dev', function(){ return html_dev().pipe(gulp.dest(dest)); });
gulp.task('html',     function(){ return html().pipe(gulp.dest(dest)); });
gulp.task('assets',   function(){ return gulp.src(src+'/assets/**/*', { base: src }).pipe(gulp.dest(dest)); });

// ------------------------------------------------

// definir as principais tarefas no gulp, as tarefas que estarão disponíveis para os
// usuários executarem
gulp.task('help', function(){
  let msg = `
    Forma de uso:
        gulp { tarefa }
    
    Tarefas disponiveis:
    - clean: para limpar a pasta do build final ('${dest}')
    - dev:   para compilar os arquivos sem minificar
    - help:  para mostrar esta ajuda
    - prod:  para compilar os arquivos com minificação
    - watch: para iniciar o observador de arquivos para compilação
  `;
  console.log(msg);
});
gulp.task('default', ['help']);

gulp.task('dev',  ['clean', 'assets', 'css-dev', 'js-dev', 'html-dev']);
gulp.task('prod', ['clean', 'assets', 'css',     'js',     'html']);

var watchOpts = {
  interval: 700
};
gulp.task('watch', function(){
  gulp.watch(src+'/**/*', watchOpts, ['dev']);
});
