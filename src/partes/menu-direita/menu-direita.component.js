$(function(){
  var component = $('#menu-direita');
  
  var botaoFechar = component.find('.botao-menu');
  
  new Hammer(botaoFechar.get(0)).on('tap', function(){
    console.log('Tap!');
    component.toggleClass('fechado');
  });
  
});