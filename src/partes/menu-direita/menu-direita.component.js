$(function(){
  var component = $('#menu-direita');
  if( !component.length ) return;
  var botaoFechar = component.find('.botao-menu');
  
  var classFechado = 'fechado';
  var wFim = component.width() - 40 ;
  var conf = { targets: component.get(0), duration: 600, elasticity: 400 };
  
  var lastAnime = null;
  
  botaoFechar.hammer().on('tap', function(ev){
    if( lastAnime ) lastAnime.pause();
    component.toggleClass(classFechado);
    if( component.hasClass(classFechado) ){
      lastAnime = anime( $.extend({ translateX: wFim }, conf) );
    }else{
      lastAnime = anime( $.extend({ translateX: 0 }, conf) );
    }
  });
  
});