import { roomsForRent, rentObject, typeText } from './data.js';
import { removeAllChildren } from './utils.js';

const coordinateOfTokio = '35.6804, 139.7690'; // координаты Токио
const map = document.querySelector('.map');
const adForm = document.querySelector('.ad-form');
const fieldSet = document.querySelector('.ad-form__element');
const inputAddress = document.querySelector('#address');

map.classList.add('map--faded');
adForm.classList.add('ad-form--disabled');
fieldSet.classList.add('disabled');
inputAddress.setAttribute('readonly', 'true');

// Загрузка карты
const mapCanvas = L.map('map-canvas')

  .on('load', () => {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldSet.classList.remove('disabled');
    inputAddress.value = coordinateOfTokio;
  })

  .setView({
    lat: 35.6804,
    lng: 139.7690,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

// Отрисовка главного пина
const mainPinIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6804,
    lng: 139.7690,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(mapCanvas);

// Получение координат главного пина после передвижения по карте, отображается в Поле Адрес
mainPinMarker.on('moveend', (evt) => {
  let coordinateOfMainPin = evt.target.getLatLng();
  let inputAddress = document.querySelector('#address');
  inputAddress.value = `${coordinateOfMainPin.lat.toFixed(5)}` + ', ' + `${coordinateOfMainPin.lng.toFixed(5)}`;
});

// Отрисовка попапа
const createCustomPopup = function() {
  let cardElement = document.querySelector('#card').content.querySelector('.popup');
  const popupElement =  cardElement.cloneNode(true)

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

// Отрисовка остальных пинов, получение координат из массива объектов
for(let i = 0; i < roomsForRent.length; i++) {
  console.log(roomsForRent.length); // почему то отрисовывается всего один пин, хотя длина массива 10 ?

  let lat = roomsForRent[i].location.x;
  let lng = roomsForRent[i].location.y;

  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
      createCustomPopup(rentObject),
      {
        keepInView: true,
      },
    );
}
