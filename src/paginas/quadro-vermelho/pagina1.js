
console.log('Script da página 1');

$(function(){
  $('.quadro.vermelho').on('click', function(){
    $(this).toggleClass('movimentado');
  });
});
