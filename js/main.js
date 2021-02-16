'use strict';

const MAX_RENT_OBJECTS = 10;
const HOUSE_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];
const HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
const TIME_CHECKIN = ['12:00', '13:00', '14:00'];
const TIME_CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

let getRandomFloat = function(min, max, decimal) {
  return (Math.random() * (max - min) + min).toFixed(decimal);
}

let getRandomNumber = function(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

let getRandomElement = function(arr) {
  let y = Math.floor(Math.random() * arr.length);
  return arr[y];
}

let getRandomLength = function(arr){
  let results = [];
  let lastIndex = Math.round(Math.random() * arr.length);
  let arrSliced = arr.slice(0, lastIndex);
  results.push(arrSliced);
  return results;
}

let roomsForRent = [];

for (let i = 0; i < MAX_RENT_OBJECTS; i++) {

  let rentObject = {};

  rentObject.author = {'avatar': 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'}

  rentObject.location = {
    'x': getRandomFloat(35.65000, 35.70000, 5),
    'y': getRandomFloat(139.70000, 139.80000, 5),
  }

  rentObject.offer = {
    'title': getRandomElement(HOUSE_TITLE),
    'address': rentObject.location.x + ',' + rentObject.location.y,
    'price': getRandomNumber(100,10000),
    'type': getRandomElement(HOUSE_TYPE),
    'rooms': getRandomNumber(1, 5),
    'guests': getRandomNumber(1, 3),
    'checkin': getRandomElement(TIME_CHECKIN),
    'checkout': getRandomElement(TIME_CHECKOUT),
    'features': getRandomLength(FEATURES),
    'description': getRandomElement(DESCRIPTION),
    'photos': getRandomLength(PHOTOS),
  }

  roomsForRent.push(rentObject);
}
