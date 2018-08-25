#!/usr/bin/env node

var config =  require('./package.json');
var fs =      require('fs');
var path =    require('path');
var program = require('commander');

program.version( config.version );

var templateCache = {}; // guardar templates lidos para evitar acessar várias vezes o HD
var src = config.config.src ;

program
  .command('component <name>')
  .alias('c')
  .description('Cria um componente, que é composto pelos arquivos ".njk", ".js" e ".less".')
  .option('--no-dir', 'Cria a estrutura de arquivos sem criar o diretório que "empacota" os arquivos')
  .action(function(name, opts){
    var idxFile =   name.lastIndexOf('/') ;
    var fileName = name.substring(idxFile + 1, name.length) ;
    if( opts.dir ){
      name += '/' + fileName;
      idxFile =     name.lastIndexOf('/') ;
    }
    if( idxFile > -1 ){
      var dir =     name.substring(0, idxFile );
      mkDirByPathSync( src + '/' + dir );
    }
    fs.writeFileSync( src + '/' + name + '.component.js',   template('template.component.js', { '$fileName': fileName }) );
    fs.writeFileSync( src + '/' + name + '.component.less', template('template.component.less', { '$fileName': fileName }) );
    fs.writeFileSync( src + '/' + name + '.component.njk',  template('template.component.njk', { '$fileName': fileName }) );
  })
  ;
  
program
  .command('service <name>')
  .alias('s')
  .description('Cria um serviço (um arquivo ".js").')
  .action(function(name, opts){
    var idxFile =   name.lastIndexOf('/') ;
    if( idxFile > -1 ){
      var dir =     name.substring(0, idxFile );
      mkDirByPathSync( src + '/' + dir );
    }
    fs.writeFileSync( src + '/' + name + '.service.js', '' );
  })
  ;



// ---------------------------------
program.parse(process.argv); // executar





// ---------------------------------
// ---  Funções auxiliares

function template(name, opts){
  var templateStr = '';
  if( name in templateCache ){
    templateStr = templateCache[ name ];
  }else{
    templateStr = fs.readFileSync('./ger-templates/' + name, { encoding: 'utf-8' });
    templateCache[ name ] = templateCache;
  }
  if( opts ){
    for(var key in opts){
      templateStr = templateStr.replace(key, opts[ key ]);
    }
  }
  return templateStr;
}


function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  targetDir = targetDir.replace(/\/{2,}/g,'/'); //.replace(/^\.[\/\\]/,'') ;
  const sep = targetDir.indexOf('/') > -1 ? '/' : '\\';
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      if( !fs.existsSync(curDir) ){
        fs.mkdirSync(curDir);
      }
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && targetDir === curDir) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}






