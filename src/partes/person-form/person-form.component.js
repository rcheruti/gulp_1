$(function(){
  var component = $('#person-form');
  if( !component.length ) return;
  
  var componentQuadro = component.find('.quadro');
  var componentForm = component.find('form');
  
  var baloesMolde = $('[template=baloes]').children();
  var bolaMolde = $('[template=bola]').children();
  
  var colors = ['rgb(255, 74, 74)','rgb(105, 204, 110)','rgb(29, 153, 255)', 'rgb(214, 228, 29)', 'rgb(247, 117, 240)'];
  
  component.hammer().on('tap', function(ev){ 
    if( ev.gesture.target == componentForm.get(0) || componentForm.has(ev.gesture.target).length ) return;
    var clone = baloesMolde.clone();
    clone.css({ y: ev.gesture.center.y, x: ev.gesture.center.x });
    
    componentQuadro.append( clone );
    var timeline = anime.timeline();
    timeline.add({ targets: clone.find('.circulo.c1').get(0), duration: 1400, offset: 0, easing: 'easeOutCubic', r: '155' });
    timeline.add({ targets: clone.find('.circulo.c1').get(0), duration:  400, offset: '-=1200', easing: 'easeOutCubic', opacity: 0 });
    timeline.add({ targets: clone.find('.circulo.c2').get(0), duration: 1400, offset: 0, easing: 'easeOutBack', r: '65' });
    timeline.add({ targets: clone.find('.circulo.c2').get(0), duration:  600, offset: '-=1000', easing: 'easeOutCubic', opacity: 0 });
    
    for( var i = 0; i < Math.random() * 16 + 6; i++ ){
      var temp = bolaMolde.clone();
      var dist = 40;
      var x = Math.random() * dist - (dist/2) ;
      var y = Math.random() * dist - (dist/2) ;
      var tam = Math.sqrt( x*x + y*y );
      var d_x = x * (200 / tam) - x;
      var d_y = y * (200 / tam) - y;
      temp.css({ y: y, x: x });
      temp.attr({ fill: randomColor() });
      clone.append( temp );
      timeline.add({ targets: temp.get(0), duration: 1400, offset: 0, easing: 'easeOutCubic', r: [{ value: '1' }, { value: '25' }, { value: '0' }], translateX: d_x, translateY: d_y });
      timeline.add({ targets: temp.get(0), duration: 400, offset: '-=600', easing: 'easeOutCubic', opacity: 0 });
    }
    
    
    setTimeout(function(){
      clone.remove();
    }, 1400);
  });
  
  // ------------
  
  function randomColor(){
    var idx = parseInt( Math.random() * colors.length );
    return colors[idx];
  }
  
});