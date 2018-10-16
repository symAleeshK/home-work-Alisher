// Код jQuery для работы вкладок

$(function () {
  var tabsContainers = $('#tabs > div');                           // получаем массив содержимого вкладок
  tabsContainers.hide().filter(':first').show();                   // прячем все, кроме первого
                                  
  $('#tabs ul.tabNav a').click(function () {                       // обрабатываем клик по вкладке
      tabsContainers.hide();                                       // прячем все вкладки
      tabsContainers.filter(this.hash).show();                     // показываем содержимое текущей вкладки
      $('#tabs ul.tabNav a').removeClass('selected');              // у всех убираем класс 'selected'
      $(this).addClass('selected');                                // текушей вкладке добавляем класс 'selected'
      return false;
  }).filter(':first').click();
});