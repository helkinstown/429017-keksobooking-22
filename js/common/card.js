import { typeText, rentObject } from './data.js';

// не работает внутри функции remove() и если не document
// как надо получить данные src, куда вставлять

// Функция удаляем потомков родителя
let removeAllChildren = function (container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
  return container; // нужен ли тут return?
}

let createCard = function() {
  let cardElement = document.querySelector('template').content.querySelector('.popup').cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = rentObject.author.avatar;
  cardElement.querySelector('.popup__title').textContent = rentObject.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = rentObject.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = rentObject.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typeText[rentObject.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = rentObject.offer.rooms + ' комнаты' + ' для ' + rentObject.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + rentObject.offer.checkin + ', ' + 'выезд после ' + rentObject.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = rentObject.offer.description;

  // добавляем данные и отрисовываем features по количеству из массива
  let featuresContainer = cardElement.querySelector('.popup__features');
  featuresContainer.textContent = rentObject.offer.features;

  if(rentObject.offer.features.length !== 0) {
    removeAllChildren(featuresContainer);
    for(let i = 0; i < rentObject.offer.features.length; i++) {
      let featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + rentObject.offer.features[i];
      featuresContainer.appendChild(featureItem);
    }
  }

  // считываем размеры фото из разметки
  let photoObj = cardElement.querySelector('.popup__photo'); // находим img до перерисовки
  let imgHeight = photoObj.style.height;
  let imgWidth = photoObj.style.width; // не приходит значение из разметки (((

  // получаем данные в img src
  let photosContainer = cardElement.querySelector('.popup__photos');
  let photoData = rentObject.offer.photos;
  photosContainer.innerHTML = `<img src="${rentObject.offer.photos}">`; // отрисовывается если пустой

  if(photoData.length !== 0) {
    removeAllChildren(photosContainer);
    for(let i = 0; i < photoData.length; i++) {
      let photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.src = photoData[i];
      // прописываем размеры фото
      photoItem.style.width = imgWidth;
      photoItem.style.height = imgHeight;
      photosContainer.appendChild(photoItem);
    }
  }

  let mapBlock = document.querySelector('.map__canvas');
  mapBlock.insertBefore(cardElement, mapBlock.firstChild);
}

createCard();
