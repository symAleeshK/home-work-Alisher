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
var products = [{
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
  addProduct: function(product) {
    
     this.products.push(item);
     this.countTotalPrice();
  },
  countTotalPrice() {
    var sum = 0;

    for (var i = 0; i < this.products.length; i++) {
      sum += this.products[i].price;
    }

    this.sum = sum;

  }
};

cart.addProduct(products[0]);
cart.addProduct(products[0]);
cart.addProduct(products[0]);
cart.addProduct(products[1]);