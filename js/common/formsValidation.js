let formRoomNumber = document.querySelector('#room_number');
let formCapacity = document.querySelector('#capacity');

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;
const inputTitle = document.querySelector('#title');
const inputPrice = document.querySelector('#price');
const inputRoomNumber = document.querySelector('#room_number');

inputTitle.addEventListener('invalid', () => {

  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
  } else if (inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity('Имя не должно превышать 100 символов'); // максимум задан в разметке, тут не надо обрабатывать?
  } else if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Обязательное поле');
  } else {
    inputTitle.setCustomValidity('');
  }
});

inputTitle.addEventListener('input', () => {

  const valueLength = inputTitle.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    inputTitle.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) +' симв.');
  } else {
    inputTitle.setCustomValidity('');
  }
  inputTitle.reportValidity();
});

inputPrice.addEventListener('input', () => {

  const valuePrice = inputPrice.value;

  if (valuePrice < 0) {
    inputPrice.setCustomValidity('Цена не может быть отрицательной');
  } else if (valuePrice > MAX_PRICE) {
    inputPrice.setCustomValidity('Цена не может превышать 1 миллион');
  } else {
    inputPrice.setCustomValidity('');
  }
  inputPrice.reportValidity();
});

formRoomNumber.addEventListener('input', (evt) => {

  if(evt.target.value === 1) {
    formCapacity.value = '';
    // показывать скрывать
  }

});


// если значение '' то подставляем плейсхолденр
// если ввод, то старт от мин значения
