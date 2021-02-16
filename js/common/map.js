import { typeText, rentObject } from './data.js';

let createCard = function() {
  let cardElement = document.querySelector('template').content.querySelector('.popup').cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = rentObject.author.avatar;
  cardElement.querySelector('.popup__title').textContent = rentObject.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = rentObject.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = rentObject.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typeText[rentObject.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = rentObject.offer.rooms + ' комнаты' + ' для' + rentObject.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + rentObject.offer.checkin + ', ' + 'выезд после ' + rentObject.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = rentObject.offer.features;
  cardElement.querySelector('.popup__description').textContent = rentObject.offer.description;
  cardElement.querySelector('.popup__photos').src = rentObject.offer.photos;

  let mapBlock = document.querySelector('.map__canvas');
  mapBlock.insertBefore(cardElement, mapBlock.firstChild);
}

createCard();
