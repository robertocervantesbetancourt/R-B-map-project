$(document).ready(function(){
  $(".map-button input").on('click', function(e){
    let mapId = $(this).attr("map-id");
    console.log('The map id is ' + mapId);
    e.preventDefault()
    $.ajax({
      url: `/map/${mapId}`,
      type: 'get',
    })
    .then(function(data){
      console.log('ajax call...')
      $('#locations-list').html(data)
    })
    .then(function(){
      $(".location-button input").on('click', function(e){
        let locId = $(this).attr('location-id');
        console.log('The location id is ' + locId);
        e.preventDefault()
        $.ajax({
          url: `/location/${locId}`,
          type: 'get',
        })
        .then(function(data){
          console.log('ajax call...')
          $('#location-info').html(data)
        })
      })
    })
  })

  const $newMap = document.querySelector('#new-map')
  $($newMap).submit(function(e){
    e.preventDefault();
    const message = $(this).serialize();
    let userID = $(this).attr("user-id")
    $.ajax({
      url: `/map/creator/${userID}`,
      type: 'post',
      data: message
    })
    .then(function(data){
      console.log(location.href);
      $newMap.reset();
      $('#test-map-widget').load(location.href + " #test-map-widget");
    //   console.log(data)
      //$('#maps-section').html(data)
    })
  })

})
