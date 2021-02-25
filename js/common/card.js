import { typeText, rentObject } from './data.js';

// как добавить размеры фото? они же есть в стилях но не срабатывают
// как скрыть элемент? как удалить див потомков. строка 24 и 25
// правильно ли удаляются потомки перед отрисовкой? строка 27


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

  // массив с фичами
  let featuresContainer = cardElement.querySelector('.popup__features');
  featuresContainer.textContent = rentObject.offer.features;

  if(rentObject.offer.features.length === 0) {
    //featuresContainer.parentElement.removeChild(featuresContainer);
    featuresContainer.style.display = 'none';
  } else {
    while (featuresContainer.firstChild) {
      featuresContainer.firstChild.remove();
    }
  }

  for(let i = 0; i < rentObject.offer.features.length; i++) {
    let featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + rentObject.offer.features[i];
    featuresContainer.appendChild(featureItem);
  }

  // массив с фото
  let photosContainer = cardElement.querySelector('.popup__photos');
  photosContainer.src = rentObject.offer.photos;

  if(rentObject.offer.photos.length === 0) {
    photosContainer.style.display = 'none';
  } else {
    while (photosContainer.firstChild) {
      photosContainer.firstChild.remove();
    }
  }

  for(let i = 0; i < rentObject.offer.photos.length; i++) {
    let photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = rentObject.offer.photos[i];
    photosContainer.appendChild(photoItem);
  }

  let mapBlock = document.querySelector('.map__canvas');
  mapBlock.insertBefore(cardElement, mapBlock.firstChild);
}

createCard();
