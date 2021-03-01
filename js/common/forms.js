let adFormEvent = function () {
  let formTypeOfHome = document.getElementById('type');
  let formPriceForNight = document.getElementById('price');
  let formCheckIn = document.getElementById('timein');
  let formCheckOut = document.getElementById('timeout');

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
        // как тут правильно описать default?
    }
  });

  formPriceForNight.addEventListener('input', function(evt) {
    if(evt.target.value < 0) {
      evt.target.value = ''; // правильно ли я выбрала тип события, поле числовое?
    }
  });

  formCheckIn.addEventListener('change', function (evt) {

    switch(evt.target.value) {
      case '12:00':
        formCheckOut.value = '12:00';
        break;
      case '13:00':
        formCheckOut.value = '13:00';
        break;
      case '14:00':
        formCheckOut.value = '14:00';
        break;
    }
  });

  formCheckOut.addEventListener('change', function (evt) {

    switch(evt.target.value) {
      case '12:00':
        formCheckIn.value = '12:00';
        break;
      case '13:00':
        formCheckIn.value = '13:00';
        break;
      case '14:00':
        formCheckIn.value = '14:00';
        break;
    }
  });
}

adFormEvent();
