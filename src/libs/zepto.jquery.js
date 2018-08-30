
// Nessário para que alguns plugins do jQuery também funcionem com o Zepto.
// Alguns plugins do jQuery buscam ele pela variável "jQuery" ao invés de usare "$".
window.jQuery = Zepto;
