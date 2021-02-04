// Домашнее задание 2. Функции

// let number = Math.random(); // от 0 до <1
// console.log(number);
// let number1 = Math.random() * 100; // от 1 до 100
// console.log(number1);
//
// let number2 = Math.ceil(Math.random() * 100); // от 1 до 100 + округлить в большую сторону
// console.log(number2);
//


// Функция, возвращающая случайное !целое! число из переданного диапазона включительно.

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomIntInclusive(0, 100));
console.log(getRandomIntInclusive(100, 0));
console.log(getRandomIntInclusive(10, 10));


// Функция возвращает псевдослучайное !число с плавающей точкой! из переданного диапазона включительно

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
console.log(getRandomArbitrary(0, 100));
console.log(getRandomArbitrary(100, 0));
console.log(getRandomArbitrary(10, 10));


// источник MDN: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://habr.com/ru/post/312880/ обсудить с наставником, что делают min/max?


// Проверка длины строки

let line = document.querySelector('.popup__description').innerHTML;
console.log(line);

let checkLineLenght = function (line, lengthMax) {

  if ( line.length > lengthMax ) {
    console.log('Превышено допустимое количество символов');
    return true;
  } else {
    console.log('Пиши еще'); // тут может быть ваш счетчик символов
    return false;
  }
}

console.log(checkLineLenght(line, 10));

// это больше похоже на псевдокод, затрудняюсь с заданием, в консоли не работает :-(
