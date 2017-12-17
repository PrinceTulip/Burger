var btn = document.querySelector('.btn-burger');
var close = document.querySelector('.btn-close');
var modal  = document.querySelector('.burger-modal');

btn.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal-show');
});
close.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal-show');
});

$(function() {
    $(".team__link").on("click", function(e) {
        e.preventDefault();
        var $this = $(e.currentTarget);
        var item = $this.closest(".team__item");
        var teamRow = $(".team-row");

<<<<<<< HEAD

$(document).ready(function(){
    $('.slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
});
=======
        item
            .toggleClass("team__item--open")
            .siblings()
            .removeClass("team__item--open");
        teamRow.outerHeight();
    });
>>>>>>> plugin
});

