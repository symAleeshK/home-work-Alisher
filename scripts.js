function init() {
	var slider = document.querySelectorAll('.slider__thumbs img');
	var bigImage = document.querySelector('.show-full-img img');
	bigImage.onerror = () => { // проверка на ошибки при загрузки картинки, если ошибка, то подставляется адрес картинки по дефолту
		alert('Увеличенное изображение не найдено');
	}
	
	changeBigPictureSrc(slider[0].src); // выводится картинка по дефолту(первая)

	slider.forEach(element => {
		element.addEventListener('click', changeBigPicture); //подключил обработчик для каждого изображения отдельно, для исключения ложных срабатываний при клике между картинок
	});

	// навигация для слайдера
	var sliderNavPrev = document.querySelector('.slider-nav');
	sliderNavPrev.addEventListener('click', (event) => {
		if (event.target.classList.contains('prev')) { // проверка класса и вызов соответствующей функции
			showPrev(slider);
		};
		if (event.target.classList.contains('next')) {
			showNext(slider);
		};
	});

	function changeBigPicture(event) { // отслеживает клик по картинке
		var smallImg = event.target.src;
		changeBigPictureSrc(smallImg);
	};

	function changeBigPictureSrc(src) { // меняет у bigImage параматер src
		nowShowingImgSrc = src
		var srcArr = src.split('/');
		var smallImgName = srcArr[srcArr.length -1];
		var bigImgScr = 'img/big/' + smallImgName;
		bigImage.src = bigImgScr;
	};

	function showPrev(slider) { // показывает предыдущий слайд
		console.log(slider)
		if (slider[0].src == nowShowingImgSrc) {
			nowShowingImgSrc = slider[slider.length - 1].src;
		}
		else for(var i=1; i < slider.length; i++) {
			if (slider[i].src == nowShowingImgSrc) {
				nowShowingImgSrc = slider[i - 1].src
			};
		};
		changeBigPictureSrc(nowShowingImgSrc);
	};

	function showNext(slider) { // показывае следующий слайд
		if (slider[slider.length - 1].src == nowShowingImgSrc) {
			nowShowingImgSrc = slider[0].src;
		}
		else for(var i = slider.length - 1; i >= 0; i--) {
			if (slider[i].src == nowShowingImgSrc) {
				nowShowingImgSrc = slider[i+1].src;
			};
		};
		changeBigPictureSrc(nowShowingImgSrc);
	};

	// добавление товара в корзину
	btnBuy = document.querySelectorAll('.btn-buy');
	var cart = document.querySelector('.cartItems');
	btnBuy.forEach(element => {
		element.addEventListener('click', addToCart); //подключил обработчик для каждого изображения отдельно, для исключения ложных срабатываний при клике между картинок
	});

	var total = 0;
	function addToCart(event) { // добавляем по товар в корзину по title b зкшсу
		var cartItem = document.createElement('li');
		cartItem.innerHTML = event.target.dataset.title + ' - $' + event.target.dataset.price;
		cart.appendChild(cartItem);
		var totalHTML = document.querySelector('.total');
		total += parseFloat(event.target.dataset.price); // считаем сумму добавленных в корзину товаров
		totalHTML.innerHTML = 'Сумма к оплате: $' + total;
	}
}
window.onload = init;