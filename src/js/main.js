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
        item
            .toggleClass("team__item--open")
            .siblings()
            .removeClass("team__item--open");
        teamRow.outerHeight();
    });
});





var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: new google.maps.LatLng(59.896226, 30.424275),
        mapTypeId: 'roadmap'
    });


    var icons = {
        logo: {
            icon: {
                url: "../img/symbol/sprite.svg#map-marker",
                size: new google.maps.Size(50, 60),
                scaledsize: new google.maps.Size(50, 60)
            }
        }
    };

    var features = [
        {
            position: new google.maps.LatLng(59.896248, 30.424275),
            type: 'logo'
        } ,

        {
            position: new google.maps.LatLng(59.895356, 30.423146),
            type: 'logo'
        },

        {
            position: new google.maps.LatLng(59.894529, 30.417746),
            type: 'logo'
        },

        {
            position: new google.maps.LatLng(59.898440, 30.428543),
            type: 'logo'
        }
    ];

    // Create markers.
    features.forEach(function(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
        });
    });
}

