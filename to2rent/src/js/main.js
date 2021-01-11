$(function () {
  $('.slider').slick({
    nextArrow: '<button class="slick-arrow slick-next"><img src="img/arrow.png" alt="next"></button>',
    prevArrow: '<button class="slick-arrow slick-prev"><img src="img/arrow.png" alt="prev"></button>'
  });

  var firstInput = $('.search__form-input');
  var secondInput = $('.footer__form-input');
  var firstForm = $('.search__form');
  var secondForm = $('.footer__form');

  firstForm.submit(function(e) {
    e.preventDefault();
    submitHandler(firstInput);
  });
  secondForm.submit(function(e) {
    e.preventDefault();
    submitHandler(secondInput);
  });


  function submitHandler(curInput) {
    if(curInput.val() === ''){
      console.log('Поле пустое!');
      return
    }
    console.log(curInput.val());
    curInput[0].value = '';
  };
});