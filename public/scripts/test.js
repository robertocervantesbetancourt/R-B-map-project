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
      const $newLocation = document.querySelector('#new-location')
      // $($newLocation).submit(function(e){
      //   alert('click')
      //   console.log('ajax call...')
      //   e.preventDefault();
      //   const message = $(this).serialize();
      //   $.ajax({
      //     url: `/location`,
      //     type: 'post',
      //     data: message
      //   })
      //   .then(function(data){
      //     $newLocation.reset();
      //     $('#location-widget').load(location.href + " #location-widget");
      //   })
      // })
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
          $('#locations-list').append(location.href + 'test_locations.ejs');
          console.log($('#locations-list').html());
        })
      })
    })
})
