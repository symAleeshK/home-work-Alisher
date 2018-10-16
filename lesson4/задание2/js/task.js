//TASK #2 Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
// При нажатии на кнопку «Отправить» произвести валидацию полей.
document.querySelector('input[type="submit"]').addEventListener('click', function () {
  var name = document.querySelector('#name');
  var tel = document.querySelector('#tel');
  var mail = document.querySelector('#mail');
  // var nameRE = /^[A-Za-zА-Яа-яЁё]{2,}$/i;
  var nameRE = /^[a-zа-яё]{2,}$/i;
  var telRE = /\+\d{1,4}\(?\d{3}\)?\d{3}-?\d{4}\b/;
  var emailRE = /(^\w+(|(\.|\-)\w+))(?=@[a-z]{2,}\.[a-z]{2,4}\b)/i;
  //e-mail validation with comments
  //     var emailRE = /(^\w+(|(\.|\-)\w+))(?=@mail\.ru\b)/gi;
  /*                1  2     3           4
  1. ищет буквы или цифры в начале строки в количестве от 1 и более;
  2. далее может идти:
  3. Или точка или дефис, после которых идет \w от 1 и более;
  4. И все это только если далее идет @mail.ru, и mail.ru является границей слова.
  */

  //if validation is false, red border appears around input (with class 'false')
  //and message too
  function classListToggle(re, data) {
      var test = re.test(data.value);
      if (test) {
          data.classList.remove('false');
          data.nextElementSibling.classList.add('hidden');
      } else {
          data.classList.add('false');
          data.nextElementSibling.classList.remove('hidden');
      }
  }

  classListToggle(nameRE, name);
  classListToggle(telRE, tel);
  classListToggle(emailRE, mail);

  //button 'reset' clears all classes 'false'
  document.querySelector('input[type="reset"]').addEventListener('click', function () {
      name.classList.remove('false');
      tel.classList.remove('false');
      mail.classList.remove('false');
  });
});