// Функция, возвращающая случайное !целое! число из переданного диапазона включительно.

let getRandomNumber = function (min, max) {
  if(min < 0 || max < 0) {
    return 'Число не должно быть отрицательным!';
  }
  if(min === max) {
    return 'Числа для обозначения диапазона - одинаковые!';
  }
  return Math.round(Math.random() * (max - min)) + min;
}

getRandomNumber(0, 100);

// Функция возвращает случайное !число с плавающей точкой! из переданного диапазона включительно.
// Округлить до одного знака после запятой

let getRandomFloat = function (min, max, decimal) {
  return (Math.random() * (max - min) + min).toFixed(decimal);
}

getRandomFloat(0, 100, 1);

// Функция, проверяющая максимальную длину строки

let checkLineLength = function (line, lengthMax) {
  return line.length < lengthMax;
}

checkLineLength('Строка', 10);
