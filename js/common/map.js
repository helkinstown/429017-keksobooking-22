import { roomsForRent, typeText } from './data.js';
import { removeAllChildren } from './utils.js';

const MAIN_PIN_LAT = '35.6804';
const MAIN_PIN_LNG = '139.7690';
const MAIN_PIN_HEIGHT = 52;
const MAIN_PIN_WIDTH = 52;
const PIN_HEIGHT = 40;
const PIN_WIDTH = 40;

const map = document.querySelector('.map');
const adForm = document.querySelector('.ad-form');
const fieldSet = document.querySelector('.ad-form__element');
const inputAddress = document.querySelector('#address');

map.classList.add('map--faded');
adForm.classList.add('ad-form--disabled');
fieldSet.classList.add('disabled');
inputAddress.setAttribute('readonly', 'true');

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldSet.classList.remove('disabled');
    inputAddress.value = MAIN_PIN_LAT + ', ' + MAIN_PIN_LNG;
  })

  .setView({
    lat: MAIN_PIN_LAT,
    lng: MAIN_PIN_LNG,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainPinIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [MAIN_PIN_HEIGHT, MAIN_PIN_WIDTH],
  iconAnchor: [MAIN_PIN_HEIGHT / 2, MAIN_PIN_WIDTH],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_PIN_LAT,
    lng: MAIN_PIN_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(mapCanvas);

mainPinMarker.on('moveend', (evt) => {
  let coordinateOfMainPin = evt.target.getLatLng();
  inputAddress.value = `${coordinateOfMainPin.lat.toFixed(5)}` + ', ' + `${coordinateOfMainPin.lng.toFixed(5)}`;
});

const createCustomPopup = function(rentObject) {
  let cardElement = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = cardElement.cloneNode(true)

  popupElement.querySelector('.popup__avatar').src = rentObject.author.avatar;
  popupElement.querySelector('.popup__title').textContent = rentObject.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = rentObject.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = rentObject.offer.price + ' ₽/ночь';
  popupElement.querySelector('.popup__type').textContent = typeText[rentObject.offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = rentObject.offer.rooms + ' комнаты' + ' для ' + rentObject.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + rentObject.offer.checkin + ', ' + 'выезд после ' + rentObject.offer.checkout;
  popupElement.querySelector('.popup__description').textContent = rentObject.offer.description;

  let featuresContainer = popupElement.querySelector('.popup__features');
  removeAllChildren(featuresContainer);

  if(rentObject.offer.features.length !== 0) {

    for(let i = 0; i < rentObject.offer.features.length; i++) {
      let featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + rentObject.offer.features[i];
      featuresContainer.appendChild(featureItem);
    }
  }

  let photoObj = popupElement.querySelector('.popup__photo');
  let imgHeight = photoObj.height;
  let imgWidth = photoObj.width;

  let photosContainer = popupElement.querySelector('.popup__photos');
  let photoData = rentObject.offer.photos;
  removeAllChildren(photosContainer);

  if(photoData.length !== 0) {

    for(let i = 0; i < photoData.length; i++) {
      let photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.src = photoData[i];
      photoItem.width = imgWidth;
      photoItem.height = imgHeight;
      photosContainer.appendChild(photoItem);
    }
  }
  return popupElement;
};

for(let i = 0; i < roomsForRent.length; i++) {

  let lat = roomsForRent[i].location.x;
  let lng = roomsForRent[i].location.y;

  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [PIN_HEIGHT, PIN_WIDTH],
    iconAnchor: [PIN_HEIGHT / 2, PIN_WIDTH],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
      draggable: false,
    },
  );

  marker
    .addTo(mapCanvas)
    .bindPopup(
      createCustomPopup(roomsForRent[i]),
      {
        keepInView: true,
      },
    );
}
