function Good(id, title, price) {
    Container.call(this, id);
    this.title = title;
    this.price = price;
}

Good.prototype = Object.create(Container.prototype);
Good.prototype.constructor = Good;

Good.prototype.render = function (jQuerySelector) {
    var $goodContainer = $('<div />', {
        class: 'good'
    });

    var $goodTitle = $('<p />', {
        class: "goods-title",
        text: this.title
    });

    var $goodPrice = $('<p>Цена: <span class="product-price">' + this.price + '</span> руб.</p>');

    var $goodBtn = $('<button />', {
        class: 'buy_good',
        'data-id': this.id,
        text: 'Купить'
    });

    //Создаем иерархию элементов
    $goodTitle.appendTo($goodContainer);
    $goodPrice.appendTo($goodContainer);
    $goodBtn.appendTo($goodContainer);

    jQuerySelector.append($goodContainer);
};