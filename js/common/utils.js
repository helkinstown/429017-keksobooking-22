const getRandomFloat = function(min, max, decimal) {
  return (Math.random() * (max - min) + min).toFixed(decimal);
}

const getRandomNumber = function(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

const getRandomElement = function(arr) {
  let y = Math.floor(Math.random() * arr.length);
  return arr[y];
}

const getRandomLengthArray = function(arr){
  let lastIndex = Math.round(Math.random() * arr.length);
  return arr.slice(0, lastIndex);
}

const removeAllChildren = function (container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
}

export { getRandomFloat, getRandomElement, getRandomLengthArray, getRandomNumber, removeAllChildren };
