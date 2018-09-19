"use strict";

// Задание 1

/*var number = {
  units: null,
  dozens: null,
  hundreds: null,

  parse: function (n) {
    var data = ("" + n).split("").reverse().join("");
    if (data.length < 1 || data.length > 3) {
      var err = "Число должно быть в диапозоне от 0 до 999";
      log(err);
      console.log(err);
      return this;
    } else {
      switch (data.length) {
        case 3:
         this.hundreds = data[2];
        case 2:
         this.dozens = [1];
        case 1:
         this.units = [0];
      }
      return this;
    }
  },
  toString: function () {
    return "units: " + this.units + ", dozens: " + this.dozens + "hundreds: " + this.hundreds;
  }
};*/

// Задание 2 
/*var products = [{
   id: 1,
   title: 'item 1',
   price: 10,
 }, {
   id: 2,
   title: 'item 2',
   price: 20,
 }, {
   id: 3,
   title: 'item 3',
   price: 30,
 },
];

var cart = {
  products: [],
  sum: 0,
  addProduct: function(productId) {
    for (var i = 0; i < this.products.length; i++) {
      if ( this.products[i].id == productId ) {
        return this.products[i];
      }

      return false;
    }
     this.products.push(item);
     this.countTotalPrice();
  },
  addProduct: function(product) {
    var item = this.getProductById(product.id);

    if ( !item ) {
      item = {};
      item.id = product.price;
      item.quantity = 1;
      item.price = product.price;
      this.products.push(item);
    } else {
      ++item.quantity;
    }
    
    this.countTotalPrice();
  },
  countTotalPrice() {
    var sum = 0;

    for (var i = 0; i < this.products.length; i++) {
      sum += this.products[i].price * this.products[i].quantity;
    }

    this.sum = sum;

  }
};

cart.addProduct(products[0]);
cart.addProduct(products[0]);
cart.addProduct(products[0]);
cart.addProduct(products[1]);
cart.addProduct(products[2]); */

// Домашне задание к 5 уроку!!!

// Задание 1

function drawChess(){
    let mainBlock = document.querySelector('.main-block');
    let block;
    let flag = true;

    let figure = { //создаем массив с расположением фигурам
        0 : ['-263px -19px', '-484px -22px', '-372px -17px', '-150px -16px', '-38px -16px','-372px -17px', '-484px -22px','-263px -19px'],
        1 : ['-595px -19px', '-595px -19px', '-595px -19px', '-595px -19px', '-595px -19px','-595px -19px', '-595px -19px','-595px -19px'],
        6 : ['-595px -116px', '-595px -116px', '-595px -116px', '-595px -116px', '-595px -116px','-595px -116px', '-595px -116px','-595px -116px'],
        7 : ['-263px -116px', '-484px -116px', '-372px -116px', '-38px -116px', '-150px -116px','-372px -116px', '-484px -116px','-263px -116px'],
    };

    for (let i = 0; i<8; i++){
        for (let j = 0; j<8; j++){
            if (j==0) flag = !flag;

            block = document.createElement('div');

            if (flag) block.className = 'block black';
            else block.className = 'block white';

            if (figure[i]!==undefined && figure[i][j]!==undefined){
                block.style.backgroundImage = 'url(сhess_symbols_set_.png)';
                block.style.backgroundPosition = figure[i][j];
            }

            mainBlock.appendChild(block);
            flag = !flag;
        }
    }
}

drawChess();