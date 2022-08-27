function initMap() {
  var toronto = new google.maps.LatLng(43.65240482413863, -79.37105971667096);

  map = new google.maps.Map(document.getElementById("map"), {
    center: toronto,
    zoom: 11,
  });

  $.get("/google/map", function (data) {
    locations = data;
    //console.log(locations)
    for (const l of locations) {
      location.lat = l.location_latitude;
      location.lng = l.location_longitude;
      const marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      const detailWindow = new google.maps.InfoWindow({
        content: l.location_name,
      });
      marker;
      marker.addListener("mouseover", () => {
        detailWindow.open(map, marker);
      });
    }
  });

  //LISTEN FOR CLICK ON LOCATION
  google.maps.event.addListener(map, "click", (event) => {
    //add Marker
    addMarker({ location: event.latLng });
    let cord = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    let lat = cord.lat;
    let long = cord.lng;
    $(document.querySelector("#latitude")).val(lat);
    $(document.querySelector("#longitude")).val(long);
  });

  // let MarkerArray = [
  //   {
  //     location: { lat: 43.64921891042856, lng: -79.39525210389642 }, //pull data from db base
  //     content: `<h2>Hard coded<h2>`, //create a form for user to put an input here
  //   },

  //   { location: { lat: 43.654342379036905, lng: -79.40387808722794 } },

  //   {
  //     location: { lat: 43.66751614542629, lng: -79.34068557201688 },
  //     content: `<h2>hard coded<h2>`,
  //   },
  // ];

  // //LOOP THROUGH MARKER
  // for (let i = 0; i < MarkerArray.length; i++) {
  //   addMarker(MarkerArray[i]);
  // }

  //ADD MARKER

  function addMarker(property) {
    const marker = new google.maps.Marker({
      position: property.location,
      map: map,
    });

    //CHECK FOR CUSTOM ICON
    if (property.imageIcon) {
      marker.setIcon(property.imageIcon);
    }

    if (property.content) {
      const detailWindow = new google.maps.InfoWindow({
        content: property.content,
      });

      marker.addListener("mouseover", () => {
        detailWindow.open(map, marker);
      });
    }
  }
}

function addMarker(property) {
  const marker = new google.maps.Marker({
    position: property.location,
    map: map,
  });
}

$(document).ready(function () {
  //clicking on map buttons
  $(".map-button input").on("click", function (e) {
    let mapId = $(this).attr("map-id");
    console.log(`Displaying map ${mapId} locations...`);
    e.preventDefault();
    $.ajax({
      url: `/map/${mapId}`,
      type: "get",
    })
      .then(function (data) {
        console.log("ajax call...");
        console.log(data);
        $("#new-locations").html(data);
        initMap();
      })
      .then(function (e) {
        $(".locations input").on("click", function (e) {
          //console.log(e.target)
          e.preventDefault();
          if ($(this).attr("location-id")) {
            console.log("displayng location info...");
            let locId = $(this).attr("location-id");
            console.log("The location id is " + locId);
            $.ajax({
              url: `/location/${locId}`,
              type: "get",
            }).then(function (data) {
              console.log("ajax call...");
              $("#location-info").html(data);
              return;
            });
          } else if ($(this).attr("delete-id")) {
            console.log("deleting...");
            let locID = $(this).attr("delete-id");
            const message = $(this).serialize();
            $.ajax({
              url: `/location/${locID}/delete`,
              type: "post",
              data: message,
            }).then(function (data) {
              console.log(`location ${locID} got deleted`);
              $("#new-locations").load(
                location.href + " #new-locations",
                function () {
                  console.log("New location created");
                  $(".locations input").on("click", function (e) {
                    console.log(e.target);
                    e.preventDefault();
                    if ($(this).attr("location-id")) {
                      console.log("displayng location info...");
                      let locId = $(this).attr("location-id");
                      console.log("The location id is " + locId);
                      $.ajax({
                        url: `/location/${locId}`,
                        type: "get",
                      }).then(function (data) {
                        console.log("ajax call...");
                        $("#location-info").html(data);
                        return;
                      });
                    } else if ($(this).attr("delete-id")) {
                      console.log("deleting...");
                      let locID = $(this).attr("delete-id");
                      const message = $(this).serialize();
                      $.ajax({
                        url: `/location/${locID}/delete`,
                        type: "post",
                        data: message,
                      }).then(function (data) {
                        console.log(`location ${locID} got deleted`);
                        $.get(`/map/${mapId}`, function (data) {
                          $("#new-locations")
                            .html(data)
                            .then(function () {
                              console.log("delete button");
                            });
                        });
                      });
                    }
                  });
                }
              );
            });
          } else if ($(this).attr("like-id")) {
            console.log("liking...");
            let locID = $(this).attr("like-id");
            const message = $(this).serialize();
            $.ajax({
              url: `/location/${locID}/like`,
              type: "post",
              data: message,
            }).then(function (data) {
              console.log(`I like location ${locID}`);
              $.get(`/map/${mapId}`, function (data) {
                $("#new-locations").html(data);
              });
            });
          }
        });
      });
  });

  //creating a new map
  const $newMap = document.querySelector("#new-map");
  $($newMap).submit(function (e) {
    e.preventDefault();
    const message = $(this).serialize();
    let userID = $(this).attr("user-id");
    //console.log(userID)
    $.ajax({
      url: `/map`,
      type: "post",
      data: message,
    }).then(function (data) {
      $newMap.reset();
      console.log("hello");
      $.get("/test/map", function (data) {
        //console.log(data)
        $("#maps-section").html(data);
      }).then(function () {
        $(".map-button input").on("click", function (e) {
          let mapId = $(this).attr("map-id");
          console.log(`Displaying map ${mapId} locations...`);
          e.preventDefault();
          $.ajax({
            url: `/map/${mapId}`,
            type: "get",
          })
            .then(function (data) {
              console.log("ajax call...");
              $("#new-locations").html(data);
            })
            .then(function (e) {
              $(".locations input").on("click", function (e) {
                console.log(e.target);
                e.preventDefault();
                if ($(this).attr("location-id")) {
                  console.log("displayng location info...");
                  let locId = $(this).attr("location-id");
                  console.log("The location id is " + locId);
                  $.ajax({
                    url: `/location/${locId}`,
                    type: "get",
                  }).then(function (data) {
                    console.log("ajax call...");
                    $("#location-info").html(data);
                    return;
                  });
                } else if ($(this).attr("delete-id")) {
                  console.log("deleting...");
                  let locID = $(this).attr("delete-id");
                  const message = $(this).serialize();
                  $.ajax({
                    url: `/location/${locID}/delete`,
                    type: "post",
                    data: message,
                  }).then(function (data) {
                    console.log(`location ${locID} got deleted`);
                    $("#new-locations").load(
                      location.href + " #new-locations",
                      function () {
                        console.log("New location created");
                        $(".locations input").on("click", function (e) {
                          console.log(e.target);
                          e.preventDefault();
                          if ($(this).attr("location-id")) {
                            console.log("displayng location info...");
                            let locId = $(this).attr("location-id");
                            console.log("The location id is " + locId);
                            $.ajax({
                              url: `/location/${locId}`,
                              type: "get",
                            }).then(function (data) {
                              console.log("ajax call...");
                              $("#location-info").html(data);
                              return;
                            });
                          } else if ($(this).attr("delete-id")) {
                            console.log("deleting...");
                            let locID = $(this).attr("delete-id");
                            const message = $(this).serialize();
                            $.ajax({
                              url: `/location/${locID}/delete`,
                              type: "post",
                              data: message,
                            }).then(function (data) {
                              console.log(`location ${locID} got deleted`);
                              $.get(`/map/${mapId}`, function (data) {
                                $("#new-locations")
                                  .html(data)
                                  .then(function () {
                                    console.log("delete button");
                                  });
                              });
                            });
                          }
                        });
                      }
                    );
                  });
                } else if ($(this).attr("like-id")) {
                  console.log("liking...");
                  let locID = $(this).attr("like-id");
                  const message = $(this).serialize();
                  $.ajax({
                    url: `/location/${locID}/like`,
                    type: "post",
                    data: message,
                  }).then(function (data) {
                    console.log(`I like location ${locID}`);
                    $.get(`/map/${mapId}`, function (data) {
                      $("#new-locations").html(data);
                    });
                  });
                }
              });
            });
        });
      });
    });
  });

  //creating a new location
  const $newLocation = document.querySelector("#new-location");
  $($newLocation).submit(function (e) {
    console.log("ajax call...");
    e.preventDefault();
    const message = $(this).serialize();
    $.ajax({
      url: `/location`,
      type: "post",
      data: message,
    }).then(function (data) {
      $newLocation.reset();
      $("#new-locations").load(location.href + " #new-locations", function () {
        console.log("New location created");
        $(".locations input").on("click", function (e) {
          console.log(e.target);
          e.preventDefault();
          if ($(this).attr("location-id")) {
            console.log("displayng location info...");
            let locId = $(this).attr("location-id");
            console.log("The location id is " + locId);
            $.ajax({
              url: `/location/${locId}`,
              type: "get",
            }).then(function (data) {
              console.log("ajax call...");
              $("#location-info").html(data);
              return;
            });
          } else if ($(this).attr("delete-id")) {
            console.log("deleting...");
            let locID = $(this).attr("delete-id");
            const message = $(this).serialize();
            $.ajax({
              url: `/location/${locID}/delete`,
              type: "post",
              data: message,
            }).then(function (data) {
              console.log(`location ${locID} got deleted`);
              $("#new-locations").load(
                location.href + " #new-locations",
                function () {
                  console.log("New location created");
                  $(".locations input").on("click", function (e) {
                    console.log(e.target);
                    e.preventDefault();
                    if ($(this).attr("location-id")) {
                      console.log("displayng location info...");
                      let locId = $(this).attr("location-id");
                      console.log("The location id is " + locId);
                      $.ajax({
                        url: `/location/${locId}`,
                        type: "get",
                      }).then(function (data) {
                        console.log("ajax call...");
                        $("#location-info").html(data);
                        return;
                      });
                    } else if ($(this).attr("delete-id")) {
                      console.log("deleting...");
                      let locID = $(this).attr("delete-id");
                      const message = $(this).serialize();
                      $.ajax({
                        url: `/location/${locID}/delete`,
                        type: "post",
                        data: message,
                      }).then(function (data) {
                        console.log(`location ${locID} got deleted`);
                        $.get(`/map/${mapId}`, function (data) {
                          $("#new-locations")
                            .html(data)
                            .then(function () {
                              console.log("delete button");
                            });
                        });
                      });
                    }
                  });
                }
              );
            });
          } else if ($(this).attr("like-id")) {
            console.log("liking...");
            let locID = $(this).attr("like-id");
            const message = $(this).serialize();
            $.ajax({
              url: `/location/${locID}/like`,
              type: "post",
              data: message,
            }).then(function (data) {
              console.log(`I like location ${locID}`);
              $.get(`/map/${mapId}`, function (data) {
                $("#new-locations").html(data);
              });
            });
          }
        });
      });
    });
  });

  //location buttons
  $(".locations input").on("click", function (e) {
    console.log(e.target);
    e.preventDefault();
    if ($(this).attr("location-id")) {
      console.log("displayng location info...");
      let locId = $(this).attr("location-id");
      console.log("The location id is " + locId);
      $.ajax({
        url: `/location/${locId}`,
        type: "get",
      }).then(function (data) {
        console.log("ajax call...");
        $("#location-info").html(data);
        return;
      });
    } else if ($(this).attr("delete-id")) {
      console.log("deleting...");
      let locID = $(this).attr("delete-id");
      const message = $(this).serialize();
      $.ajax({
        url: `/location/${locID}/delete`,
        type: "post",
        data: message,
      }).then(function (data) {
        console.log(`location ${locID} got deleted`);
        $.get(`/map/${mapId}`, function (data) {
          $("#new-locations")
            .html(data)
            .then(function () {
              console.log("delete button");
            });
        });
      });
    } else if ($(this).attr("like-id")) {
      console.log("liking...");
      let locID = $(this).attr("like-id");
      const message = $(this).serialize();
      $.ajax({
        url: `/location/${locID}/like`,
        type: "post",
        data: message,
      }).then(function (data) {
        console.log(`I like location ${locID}`);
        $.get(`/map/${mapId}`, function (data) {
          $("#new-locations").html(data);
        });
      });
    }
  });
});
