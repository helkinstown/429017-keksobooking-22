const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;

const inputTitle = document.querySelector('#title');
const inputPrice = document.querySelector('#price');
const formRoomNumber = document.querySelector('#room_number');
const formCapacity = document.querySelector('#capacity');
let formCapacityOption = formCapacity.children;

inputTitle.addEventListener('invalid', () => {

  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
  } else if (inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity('Имя не должно превышать 100 символов'); //
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

formRoomNumber.addEventListener('change', (evt) => {

  for(let i = 0; i < formCapacityOption.length; i++) {
    formCapacityOption[i].setAttribute('disabled', 'true');
  }
  formCapacity.value = evt.target.value;

  if( evt.target.value === '1' ) {
    formCapacityOption[2].disabled = false;
  }
  if( evt.target.value === '2' ) {
    formCapacityOption[2].disabled = false;
    formCapacityOption[1].disabled = false;
  }
  if( evt.target.value === '3' ) {
    formCapacityOption[2].disabled = false;
    formCapacityOption[1].disabled = false;
    formCapacityOption[0].disabled = false;
  }
  if (evt.target.value === '100') {
    formCapacityOption[3].disabled = false;
    formCapacityOption[3].value = '0';
    formCapacity.value = '0';
  }
});
