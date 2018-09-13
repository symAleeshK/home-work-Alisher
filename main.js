"use strict"

// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100
// Списал этот пример в интернете. Один из лучших на мой взгляд примеров.
function simpleNumber (num) {
  if( num < 2 ) return false;
  let count = 2;
  while(count < num) {
    if(num % count === 0) {
      return false;
    }
    count++;
  }
  return true;
}

function getSimple(max) {
  let i = 0;
  let list = [];

  while (i < max) {
    if(simpleNumber(i)) list.push(i);
    i++;
  }
  console.log(list);
}

getSimple(100)

//