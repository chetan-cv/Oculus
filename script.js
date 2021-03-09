function addFunction() {
    var parent = document.getElementsByClassName("add-button");
    // console.log(parent[0].innerHTML);

}


$(document).ready(function () {

    var value = 0;
    var buttonClicked;
    $('.addedButton').hide();



    $('.add-button').on('click', function (e) {
        value = 0;
        buttonClicked = $(e.currentTarget);
        value = parseInt($(e.currentTarget).next().children('p').text());
        value = value + 1;
        $(e.currentTarget).next().children('p').text(value);
        $(e.currentTarget).hide();
        $(e.currentTarget).next().show();
    });

    $('.addQuantityButton').on('click', function (e) {
        value = parseInt($(e.currentTarget).prev().text());
        value += 1;
        $(e.currentTarget).prev().text(value);
    });

    $('.minusQuantityButton').on('click', function (e) {
        value = parseInt($(e.currentTarget).next().text());
        value -= 1;
        console.log($(e.currentTarget).parent().text());
        if (value == 0) {
            $(e.currentTarget).parent().hide();
            $(e.currentTarget).parent().prev().show();
            $(e.currentTarget).next().text(value);
        }
        else {
            $(e.currentTarget).next().text(value);
        }
    });

    // var addButton = document.getElementsByClassName("add-button");
    // for (let i = 0; i < addButton.length; i++) {
    //     var button = addButton[i];
    //     button.addEventListener('click', function (event) {
    //         buttonClicked = event.target;
    //         buttonClicked.remove();
    //         $('.addedButton').show();
    //     });
    // }
});
