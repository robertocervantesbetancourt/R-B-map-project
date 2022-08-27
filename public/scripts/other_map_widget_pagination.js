"use strict";

// $("body").hide(); // Test to see if this script is connected to index.ejs

let numberOfItemsOtherMap = $(
  ".other_maps_section .other_maps_section_org"
).length;
let limitPerPageOtherMap = 4;

$(
  ".other_maps_section .other_maps_section_org:gt(" +
    (limitPerPageOtherMap - 1) +
    ")"
).hide();

let totalPagesOtherMap = Math.ceil(
  numberOfItemsOtherMap / limitPerPageOtherMap
);

$(".other_maps_pagination").append(
  "<li class='page-item current_other_map_page active'><a href='javascript:void(0)'>" +
    1 +
    "</a></li>"
);

for (let i = 2; i <= totalPagesOtherMap; i++) {
  $(".other_maps_pagination").append(
    "<li class='page-item current_other_map_page'><a href='javascript:void(0)'>" +
      i +
      "</a></li>"
  );
}

$(".other_maps_pagination").append(
  "<li class='page-item next_other_map_page'><a href='javascript:void(0)' aria-label='Next'><span aria-hidden='true'>&raquo</span></a></li>"
);

$(".other_maps_pagination li.current_other_map_page").on("click", function () {
  if ($(this).hasClass("active")) {
    return false;
  } else {
    let currentPageOtherMap = $(this).index();
    $(".other_maps_pagination li").removeClass("active");
    $(this).addClass("active");
    $(".other_maps_section .other_maps_section_org").hide();

    let grandTotalOtherMap = limitPerPageOtherMap * currentPageOtherMap;

    for (
      let j = grandTotalOtherMap - limitPerPageOtherMap;
      j < grandTotalOtherMap;
      j++
    ) {
      $(".other_maps_section .other_maps_section_org:eq(" + j + ")").show();
    }
  }
});

// Next Button Functionality

$(".next_other_map_page").on("click", function () {
  let currentPageOtherMap = $(".other_maps_pagination li.active").index();
  if (currentPageOtherMap === totalPagesOtherMap) {
    return false;
  } else {
    currentPageOtherMap++;
    $(".other_maps_pagination li").removeClass("active");
    $(".other_maps_section .other_maps_section_org").hide();

    let grandTotalOtherMap = limitPerPageOtherMap * currentPageOtherMap;

    for (
      let j = grandTotalOtherMap - limitPerPageOtherMap;
      j < grandTotalOtherMap;
      j++
    ) {
      $(".other_maps_section .other_maps_section_org:eq(" + j + ")").show();
    }

    $(
      ".other_maps_pagination li.current_other_map_page:eq(" +
        (currentPageOtherMap - 1) +
        ")"
    ).addClass("active");
  }
});

$(".previous_other_map_page").on("click", function () {
  let currentPageOtherMap = $(".other_maps_pagination li.active").index();
  if (currentPageOtherMap === 1) {
    return false;
  } else {
    currentPageOtherMap--;
    $(".other_maps_pagination li").removeClass("active");
    $(".other_maps_section .other_maps_section_org").hide();

    let grandTotalOtherMap = limitPerPageOtherMap * currentPageOtherMap;

    for (
      let j = grandTotalOtherMap - limitPerPageOtherMap;
      j < grandTotalOtherMap;
      j++
    ) {
      $(".other_maps_section .other_maps_section_org:eq(" + j + ")").show();
    }

    $(
      ".other_maps_pagination li.current_other_map_page:eq(" +
        (currentPageOtherMap - 1) +
        ")"
    ).addClass("active");
  }
});
