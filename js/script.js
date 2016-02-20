$(document).ready(function() {
  $.material.init();
  fixNav($(window).scrollTop());
});

$(window).scroll(function() {
  fixNav($(window).scrollTop());
}).scroll();

function fixNav(scroll) {
  var nav = $('#main-nav');
  if(scroll > 10) {
    nav.removeClass('navbar-trans');
  } else {
    nav.addClass('navbar-trans');
  }
}

//thad: because css is dumb
$('#bs-navbar').on('show.bs.collapse', function() {
   $("#bs-navbar").css("background-color","#495058");
})
$('#bs-navbar').on('hidden.bs.collapse', function () {
     $("#bs-navbar").css("background-color","");
})