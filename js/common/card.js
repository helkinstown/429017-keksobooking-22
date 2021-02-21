import { typeText, rentObject } from './data.js';

let createCard = function() {
  let cardElement = document.getElementById('card').content.querySelector('.popup').cloneNode(true);

  // проверка на пустой элемент. не работает
  let containerCardItem = document.getElementById('card').content.querySelector('.popup');

  for(let i = 0; i < containerCardItem.children.length; i++) {
    let item = containerCardItem.children[i];

    if (item.children.src === null) {
      containerCardItem.removeChild(item);
    }
  }

  cardElement.querySelector('.popup__avatar').src = rentObject.author.avatar;
  cardElement.querySelector('.popup__title').textContent = rentObject.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = rentObject.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = rentObject.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typeText[rentObject.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = rentObject.offer.rooms + ' комнаты' + ' для' + rentObject.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + rentObject.offer.checkin + ', ' + 'выезд после ' + rentObject.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = rentObject.offer.description;

  cardElement.querySelector('.popup__features').textContent = rentObject.offer.features;
  let featuresContainer = cardElement.querySelector('.popup__features');
  let features = '';
  for(let i = 0; i < rentObject.offer.features.length; i++) {
    features += '<li class="popup__feature popup__feature--'+ rentObject.offer.features[i] +'"></li>';
  }
  featuresContainer.innerHTML = features;

  cardElement.querySelector('.popup__photos').src = rentObject.offer.photos;
  let photosContainer = cardElement.querySelector('.popup__photos');
  while (photosContainer.firstChild) {
    photosContainer.firstChild.remove();
  }
  for(let i = 0; i < rentObject.offer.photos.length; i++) {
    let photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photosContainer.appendChild(photoItem);
    photoItem.src = rentObject.offer.photos[i];
  }

  let mapBlock = document.querySelector('.map__canvas');
  mapBlock.insertBefore(cardElement, mapBlock.firstChild);
}

createCard();
