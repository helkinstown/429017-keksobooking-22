//import '../../leaflet/leaflet.js';
//import '../../leaflet/leaflet.js.map';
import { roomsForRent, rentObject } from './data.js';

let map = document.querySelector('.map');
let adForm = document.querySelector('.ad-form');
let fieldSet = document.querySelector('.ad-form__element');

map.classList.add('map--faded');
adForm.classList.add('ad-form--disabled');
fieldSet.classList.add('disabled');

const mapCanvas = L.map('map-canvas')

  .on('load', () => {

    //Переводим карту в активное состояние - это считается, что переводим средствами leaflet
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldSet.classList.remove('disabled');
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

let inputAddress = document.querySelector('#address');
inputAddress.value = 'Координаты токио'; // как получить их из setView ??
inputAddress.setAttribute('readonly', 'true'); // остается фокус

// Отрисовываем пин
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


// получаем координаты пина, который отображается в Поле Адрес

mainPinMarker.on('moveend', (evt) => {

  // главный пин есть всегда? до создания объявления?
  let coordinateOfMainPin = evt.target.getLatLng();
  let inputAddress = document.querySelector('#address');
  inputAddress.value = `${coordinateOfMainPin.lat}` + ', ' + `${coordinateOfMainPin.lng}`;
});


// Отрисовываем остальные пины - из объекта массива roomsForRent?
// ТУТ НАСТУПИЛ СТУПОР: почему попапе отрисовывается не то, что в когда ниже, почему то приходит полная отрисовка
// я сделала как в демонстрации, чтобы переделать, но теперь не понимаю почему неправильная отрисовка

const points = [
  {
    title: rentObject.offer.title,
    lat: rentObject.location.x,
    lng: rentObject.location.y,
  },
];

// тут аргументом должен быть rentObject{} из roomsForRent[]?
const createCustomPopup = function(point) { // функция отрисовки данных должна быть тут?
  const balloonTemplate = document.querySelector('template').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = point.title;
  popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${point.lat}, ${point.lng}`;

  return popupElement;
};

points.forEach((point) => {
  const {lat, lng} = point;

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
    },
  );

  marker
    .addTo(mapCanvas)
    .bindPopup(
      createCustomPopup(point),
      {
        keepInView: true,
      },
    );
});
