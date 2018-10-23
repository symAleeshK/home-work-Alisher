function ReviewForm(idContainer) {
    Container.call(this, idContainer);

}

ReviewForm.prototype = Object.create(Container.prototype);
ReviewForm.prototype.constructor = ReviewForm;

ReviewForm.prototype.render = function () {
    var $formContainer = $('#' + this.id);

    var $form = $('<form />', {
        action: '#'
    });

    var $reviewText = $('<textarea />', {
        id: this.id + '__text',
        placeholder: 'Оставьте отзыв'
    });

    var $sendReviewButton = $('<button />', {
        id: this.id + '__send',
        text: 'Отправить',
        type: 'button'
    });

    $formContainer.append($form.append($reviewText, $sendReviewButton));


};