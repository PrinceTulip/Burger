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



    $(document).ready(function(){
        $('.slider-wrapper').bxSlider({
    });
    });

