import { typeText, rentObject } from './data.js';

let removeAllChildren = function (container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
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

  let featuresContainer = cardElement.querySelector('.popup__features');
  removeAllChildren(featuresContainer);

  if(rentObject.offer.features.length !== 0) {

    for(let i = 0; i < rentObject.offer.features.length; i++) {
      let featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + rentObject.offer.features[i];
      featuresContainer.appendChild(featureItem);
    }
  }

  let photoObj = cardElement.querySelector('.popup__photo');
  let imgHeight = photoObj.height;
  let imgWidth = photoObj.width;

  let photosContainer = cardElement.querySelector('.popup__photos');
  let photoData = rentObject.offer.photos;
  removeAllChildren(photosContainer);

  for(let i = 0; i < photoData.length; i++) {
    let photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = photoData[i];
    photoItem.width = imgWidth;
    photoItem.height = imgHeight;
    photosContainer.appendChild(photoItem);
  }

  let mapBlock = document.querySelector('.map__canvas');
  mapBlock.insertBefore(cardElement, mapBlock.firstChild);
}

createCard();
