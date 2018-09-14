"use strict"

// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100
// Списал этот пример в интернете. Один из лучших на мой взгляд примеров.
/*function simpleNumber (num) {
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

getSimple(100)*/

// Задание 2.
/*var cartProduct =  [
  ['computer', 250, 1],
  ['tv', 150, 2],
  ['notebook', 1000, 1],
];

function countCartItem(cart) {
  var sum = 0;

  for (var i = 0; i < cartProduct.length; i++) {
       sum += cartProduct [i][1] * cartProduct [i][2]
  }

  return sum;
}

console.log(countCartItem(cartProduct));
*/
// Задание 3

for (var i = 0; i <= 9; console.log(i++));

// Задание 4

var str = ''

for ( var i = 0; i < 20; i++ ) {
  str += 'x';

  for ( var j = 0; j < i; j++ ) {
    str += 'x'
  }
  
  str += '\r\n';
}
console.log(str);

// Задание 5
var i = 0;

do {
  if ( i === 0 ) {
    console.log(i + ' - ноль');
  } else if (i % 2 == 0) {
    console.log(i + ' - четное число');
  } else {
    console.log(i + ' - нечетное число');
  }
  i++;
} while (i <= 10);