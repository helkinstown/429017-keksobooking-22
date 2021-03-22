let formTypeOfHome = document.querySelector('#type');
let formPriceForNight = document.querySelector('#price');
let formCheckIn = document.querySelector('#timein');
let formCheckOut = document.querySelector('#timeout');

let adFormEvent = function () {

  formTypeOfHome.addEventListener('change', function (evt) {

    formPriceForNight.setAttribute('min', '0');
    switch(evt.target.value) {
      case 'bungalow':
        formPriceForNight.min = '0';
        break;
      case 'flat':
        formPriceForNight.min = '1000';
        break;
      case 'house':
        formPriceForNight.min = '5000';
        break;
      case 'palace':
        formPriceForNight.min = '10000';
        break;
    }
    formPriceForNight.value = formPriceForNight.min;
  });

  formPriceForNight.addEventListener('input', function(evt) {
    if(evt.target.value < 0) {
      evt.target.value = '';
    }
  });

  formCheckIn.addEventListener('change', function (evt) {
    formCheckOut.value = evt.target.value;
  });

  formCheckOut.addEventListener('change', function (evt) {
    formCheckIn.value = evt.target.value;
  });
}

adFormEvent();
