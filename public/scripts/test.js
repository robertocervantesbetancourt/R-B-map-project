$(document).ready(function(){

  //Get route when clicking on a map or a location
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

  //POST route when creating a new map
  const $newMap = document.querySelector('#new-map')
  $($newMap).submit(function(e){
    e.preventDefault();
    const message = $(this).serialize();
    let userID = $(this).attr("user-id")
    $.ajax({
      url: `/map`,
      type: 'post',
      data: message
    })
    .then(function(data){
      $newMap.reset();
      $('#test-map-widget').load(location.href + " #test-map-widget");
    })
  })

    //POST route when creating a new location
    $(".map-button input").on('click', function(){
      const $newLocation = document.querySelector('#new-location')
      $($newLocation).submit(function(e){
        console.log('ajax call...')
        e.preventDefault();
        const message = $(this).serialize();
        $.ajax({
          url: `/location`,
          type: 'post',
          data: message
        })
        .then(function(data){
          $newLocation.reset();
          //console.log($('#location-widget').html());
          //$('#locations-list').load(location.href + " #locations-list");
          console.log('data:' + data)
          console.log('message:' + message)
        })
      })
    })

      //POST route to delete locations
      $(".map-button input").on('click', function(){
      const $deleteLocation = document.querySelector('#delete-location input')
      if ($($deleteLocation).length > 0){
        alert ('it exists')
      }
      $($deleteLocation).on('click', function(e){
        console.log('ajax cal...')
        e.preventDefault();
        let locationID = $(this).attr('#location-id')
        alert (`deleting ${locationID}`)
        const message = $(this).serialize();
        $.ajax({
          url: `/location/${locationID}/delete`,
          type: 'delete',
          data: message
        })
        .then(function(data){

        })
      })
    })
})
