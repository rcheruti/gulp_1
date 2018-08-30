$(function(){
  var component = $('#menu-direita');
  
  var botaoFechar = component.find('.botao-menu');
  
  botaoFechar.hammer().on('tap', function(ev){
    component.toggleClass('fechado');
  });
  
});