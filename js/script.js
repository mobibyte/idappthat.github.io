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