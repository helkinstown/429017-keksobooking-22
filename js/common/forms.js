let formTypeOfHome = document.querySelector('#type');
let formPriceForNight = document.querySelector('#price');
let formCheckIn = document.querySelector('#timein');
let formCheckOut = document.querySelector('#timeout');

let adFormEvent = function () {

  formTypeOfHome.addEventListener('change', function (evt) {

    formPriceForNight.setAttribute('min', '0');
    switch(evt.target.value) {
      case 'bungalow':
        formPriceForNight.placeholder = '0';
        formPriceForNight.min = '0';
        break;
      case 'flat':
        formPriceForNight.placeholder = '1000';
        formPriceForNight.min = '1000';
        break;
      case 'house':
        formPriceForNight.placeholder = '5000';
        formPriceForNight.min = '5000';
        break;
      case 'palace':
        formPriceForNight.placeholder = '10000';
        formPriceForNight.min = '10000';
        break;
    }
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
