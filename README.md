# Gulp Estudos

Este repositório possui um estudo do uso do Gulp para a criação de sites.

## Compilar

Para compilar os códigos é necessário ter instalado o `gulp-cli` e `http-server` de forma global no `node`.

- [Gulp](https://gulpjs.com/ "Página do Gulp"): `npm i -g gulp-cli`
- [http-server](https://www.npmjs.com/package/http-server "Página do NPM http-server"): `npm i -g http-server`

Mantenha aberto 2 terminais (linhas de comando, cmd), e execute em cada um deles os comandos:
- `npm run watch`: para iniciar o observador do Gulp, para que o código seja compilado automaticamente
- `npm run serve`: para iniciar o servidor HTTP na pasta dos arquivos compilados, acessível em [http://127.0.0.1:8080](http://127.0.0.1:8080 "Servidor local") por padrão

## Criação: com códigos auxiliares

O arquivo `ger.js` *(gerador.js)* possui alguns comandos para ajudar na criação de novos arquivos/páginas.

Os comandos disponíveis até o momento são:
- `node ger [c | component] "pasta-um/sub pasta/meu-componente"`: cria 3 arquivos:  `.component.js`, `.component.njk`, `.component.less`
- `node ger [s | service] "pasta-dois/sub pasta/meu-servico"`: cria um arquivo `.service.js`

Execute o comando `node ger --help` para ver todas as opções disponíveis.
