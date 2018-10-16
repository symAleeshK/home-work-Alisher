//construction for jQuery
(function ($) {
  //starts on document.ready
  $(function () {
    //regular expression for input field
    var $cityRE = /^[а-яё]+$/i;
    //input field
    var $cityInput = $('#city_input');
    //parent div
    var $divParent = $('#city_input_form');
    //add events on keyup in input field
    $cityInput.on('keyup', function () {
      //if input text according to reg.expr. then
      if ($cityRE.test(this.value)) {
        $divParent.removeClass('wrong_input');
        $divParent.removeClass('wrong_city');
        //refresh list of cities
        $('#city_list').remove();
        //only if number of letters is more than 2 send data to server
        if ($cityInput.val().length > 2) {
          var $citiesArr = [];
          $.ajax({
            url: 'http://api.spacenear.ru/index.php',
            type: 'POST',
            data: {pattern: this.value},
            dataType: 'json',
            success: function (cities) {
              $citiesArr = cities.map(function (value) {
                return value.name;
              });
            },
            error: function () {
              console.log('error!');
            },
            //add progress indicator
            xhr: function(){
              // get the native XmlHttpRequest object
              var xhr = $.ajaxSettings.xhr() ;
              // set the onprogress event handler
              xhr.upload.onprogress = function(){
                //add loader
                $('.loader').show();
              };
              // set the onload event handler
              // xhr.upload.onload = function(){ console.log('DONE!') } ;
              // return the customized object
              return xhr ;
            }
            //when server response
          }).done(function () {
            $('.loader').hide();
            //if array is non empty and if 'city list' non existing, create it
            if (!$('#city_list').length && $citiesArr.length > 0) {
              //create 'select' element
              var $select = $('<select />').attr({
                id: 'city_list',
                size: function () {
                  if ($citiesArr.length > 2) {
                    return $citiesArr.length;
                  }
                  return 2;
                }
              }).hide();
              for (var i = 0; i < $citiesArr.length; i++) {
                var $option = $('<option />');
                //create list of cities and add events on double click
                $option.attr('value', $citiesArr[i]).text($citiesArr[i]).dblclick(function () {
                  $cityInput.val(this.value);
                  $(this).parent().slideUp(function () {
                    $(this).remove();
                  });
                });
                $select.append($option);
              }
              $divParent.append($select);
              //add animation when select menu appearing (city list)
              $($select).slideDown();
              //if array of cities names is empty then
            } else if ($citiesArr.length === 0) {
              //show message 'No such city'
              $divParent.addClass('wrong_city');
              //remove city list
              $('#city_list').slideUp(function () {
                $(this).remove();
              });
            }
          });
        }
      } else {
        //if input text disaccording with reg.expr. add red border and message
        //'only russian letters!'
        $divParent.addClass('wrong_input');
        //removing city list
        $('#city_list').slideUp(function () {
          $(this).remove();
        });
      }
    });
  });
})(jQuery);