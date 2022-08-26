// const { on } = require("nodemon");

//Google map
function initMap() {

  var myHouse = new google.maps.LatLng(43.66016319226872, -79.488492191761);

  map = new google.maps.Map(
    document.getElementById('map'), {center: myHouse, zoom: 15});

    map.addListener("click", (e) => {
      console.log(e)
      coords = e.LatLng
      placeMarkerAndPanTo(e.latLng, map);
      $(document).ready(function() {

        // $coords = coords[0];
        // console.log(coords)
        // $('#latlong-container').append($coords);

      });
    });
  }

  function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    map.panTo(latLng);
  }


