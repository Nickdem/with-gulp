$(function () {
  $('.slider').slick({
    arrows: false,
    dots: true,
    dotsClass: 'header-dots'
  });
  $('.menu__btn').on('click', function () {
    $('.menu__list').slideToggle()
  });
});