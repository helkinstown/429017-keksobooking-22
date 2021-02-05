// Функция, возвращающая случайное !целое! число из переданного диапазона включительно.

let getRandomNumber = function (min, max) {
  if(min < 0 || max < 0) {
    return -1;
  }
  if(min === max) {
    return -2;
  }
  return Math.round(Math.random() * (max - min)) + min;
}

getRandomNumber(0, 100);

// Функция возвращает случайное !число с плавающей точкой! из переданного диапазона включительно.
// Округлить до одного знака после запятой

let getRandomFloat = function (min, max, decimal) {
  return parseInt((Math.random() * (max - min) + min).toFixed(decimal));
}

getRandomFloat(0, 100, 1);

// Функция, проверяющая максимальную длину строки

let checkLineLength = function (line, lengthMax) {
  return line.length < lengthMax;
}

checkLineLength('Строка', 10);
