#!/usr/bin/env node

var config =  require('./package.json');
var fs =      require('fs');
var path =    require('path');
var program = require('commander');

program.version( config.version );

var src = config.config.src ;

program
  .command('component <name>')
  .alias('c')
  .description('Cria um componente, que é composto pelos arquivos ".njk", ".js" e ".less".')
  .action(function(name, opts){
    var idxFile =   name.lastIndexOf('/') ;
    var dir =       name.substring(0, idxFile );
    mkDirByPathSync( src + '/' + dir );
    fs.writeFileSync( src + '/' + name + '.component.js', '' );
    fs.writeFileSync( src + '/' + name + '.component.less', '' );
    fs.writeFileSync( src + '/' + name + '.component.njk', '' );
  })
  ;
  
program
  .command('service <name>')
  .alias('s')
  .description('Cria um serviço (um arquivo ".js").')
  .action(function(name, opts){
    var idxFile =   name.lastIndexOf('/') ;
    var dir =       name.substring(0, idxFile );
    mkDirByPathSync( src + '/' + dir );
    fs.writeFileSync( src + '/' + name + '.service.js', '' );
  })
  ;



// ---------------------------------
program.parse(process.argv); // executar









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






