$(document).ready(function(){
  const $button1 = $('#map_1');
  $button1.on('click', function(e){
    e.preventDefault()
    $.ajax({
      url: '/map/1',
      type: 'get',
    })
    .then(function(data){
      console.log('ajax call...')
      $('#locations-list').html(data)
    })
    .then(function(){
    const $locationButton1 = $('#loc_1');
    $locationButton1.on('click', function(e){
      console.log('click')
      e.preventDefault()
      $.ajax({
        url: '/location/1',
        type: 'get',
      })
      .then(function(data){
        console.log('ajax call...')
        console.log(data)
        $('#location-info').html(data)
      })
    })

    const $locationButton2 = $('#loc_2');
    $locationButton2.on('click', function(e){
      console.log('click')
      e.preventDefault()
      $.ajax({
        url: '/location/2',
        type: 'get',
      })
      .then(function(data){
        console.log('ajax call...')
        console.log(data)
        $('#location-info').html(data)
      })
    })

    const $locationButton3 = $('#loc_3');
    $locationButton3.on('click', function(e){
      console.log('click')
      e.preventDefault()
      $.ajax({
        url: '/location/3',
        type: 'get',
      })
      .then(function(data){
        console.log('ajax call...')
        console.log(data)
        $('#location-info').html(data)
      })
    })
  })

  })

  const $button2 = $('#map_2');
  $button2.on('click', function(e){
    e.preventDefault()
    $.ajax({
      url: '/map/2',
      type: 'get',
    })
    .then(function(data){
      console.log('ajax call...')
      $('#locations-list').html(data)
    })
  })

  const $button3 = $('#map_3');
  $button3.on('click', function(e){
    e.preventDefault()
    $.ajax({
      url: '/map/3',
      type: 'get',
    })
    .then(function(data){
      console.log('ajax call...')
      $('#locations-list').html(data)
    })
  })






})

