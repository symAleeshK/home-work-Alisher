function ReviewsHandler(idHandler) {
    Container.call(this, idHandler);
    this.reviews = [];
    this.idComment; // будем присваивать ид к коментам по порядку
    this.loadReviews();
}

ReviewsHandler.prototype = Object.create(Container.prototype);
ReviewsHandler.prototype.constructor = ReviewsHandler;


ReviewsHandler.prototype.loadReviews = function () {
    $.post({
        url: 'review.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            for (var key in data.comments)  {
                this.reviews.push(data.comments[key]);
                this.reviews[key].isApprove = false; // имитатор одобрение/не одобрение
            }
            this.idComment = this.reviews[this.reviews.length-1].id_comment; // согласно выбранной логике последний элемент массива будет с самым большим ид
            this.render();
        }
    });
};

ReviewsHandler.prototype.render = function () {
    var $reviewDiv = $('#' + this.id);
    // $reviewDiv.empty();
    $reviewDiv.text('Отзывы');

    var $reviewItemsDiv = $('<div />', {
        id: this.id + '__items'
    });

    for (var key in this.reviews){
        $reviewItemsDiv.append(this.createCommentDiv(this.reviews[key].id_comment, this.reviews[key].text));
    }
    $reviewDiv.append($reviewItemsDiv);

};

ReviewsHandler.prototype.createCommentDiv = function (idCommnent, text) {
    var $commentDiv = $('<div />', {
        class: this.id + '__comment',
        'data-id_comment': idCommnent,
        text: 'Текст отзыва: ' + text
    });

    var $buttonDelete = $('<button />', {
        class: this.id + '__button button_delete',
        text: "Удалить"
    });

    var $buttonApprove = $('<button />', {
        class: this.id + '__button button_approve',
        text: "Одобрить"
    });
    return $commentDiv.append($buttonDelete, $buttonApprove);
}

ReviewsHandler.prototype.add = function (reviewObject) {
    if(reviewObject instanceof Review) {
        console.log('Ид пользователя-', reviewObject.idUser); // пока отправлять некуда, в спецификации указано id_user и text
        this.idComment++;
        this.reviews.push({
            id_comment: this.idComment,
            text: reviewObject.reviewText
        });
        $('#' + this.id + '__items').append(this.createCommentDiv(this.idComment, reviewObject.reviewText));
    } else {
        console.log('Ошибка добавления отзыва - неверный тип объекта');
    }
};

ReviewsHandler.prototype.remove = function (deleteIdComment) {
    for(var key in this.reviews){
        if(deleteIdComment == this.reviews[key].id_comment){
            this.reviews.splice(key, 1);
            $('[data-id_comment="' + deleteIdComment  +'"]').remove();
            break;
        }
    }
};

ReviewsHandler.prototype.approve = function (approveIdComment) {
    $('[data-id_comment="' + approveIdComment  +'"]').addClass('approve'); /* ид комента получили, можно отправлять, пока имитируем
                                                                          одобрение. */
    for(var key in this.reviews){
        if(approveIdComment == this.reviews[key].id_comment){
            this.reviews[key].isApprove = true;
            break;
        }
    }
};


