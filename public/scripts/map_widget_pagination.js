"use strict";

// $("body").hide(); // Test to see if this script is connected to index.ejs

let numberOfItemsMap = $(".maps_section .maps_section_org").length;
let limitPerPageMap = 3;

$(".maps_section .maps_section_org:gt(" + (limitPerPageMap - 1) + ")").hide();

let totalPagesMap = Math.ceil(numberOfItemsMap / limitPerPageMap);

$(".maps_pagination").append(
  "<li class='page-item current_map_page active'><a href='javascript:void(0)'>" +
    1 +
    "</a></li>"
);

for (let i = 2; i <= totalPagesMap; i++) {
  $(".maps_pagination").append(
    "<li class='page-item current_map_page'><a href='javascript:void(0)'>" +
      i +
      "</a></li>"
  );
}

$(".maps_pagination").append(
  "<li class='page-item next_map_page'><a href='javascript:void(0)' aria-label='Next'><span aria-hidden='true'>&raquo</span></a></li>"
);

$(".maps_pagination li.current_map_page").on("click", function () {
  if ($(this).hasClass("active")) {
    return false;
  } else {
    let currentPageMap = $(this).index();
    $(".maps_pagination li").removeClass("active");
    $(this).addClass("active");
    $(".maps_section .maps_section_org").hide();

    let grandTotalMap = limitPerPageMap * currentPageMap;

    for (let j = grandTotalMap - limitPerPageMap; j < grandTotalMap; j++) {
      $(".maps_section .maps_section_org:eq(" + j + ")").show();
    }
  }
});

// Next Button Functionality

$(".next_map_page").on("click", function () {
  let currentPageMap = $(".maps_pagination li.active").index();
  if (currentPageMap === totalPagesMap) {
    return false;
  } else {
    currentPageMap++;
    $(".maps_pagination li").removeClass("active");
    $(".maps_section .maps_section_org").hide();

    let grandTotalMap = limitPerPageMap * currentPageMap;

    for (let j = grandTotalMap - limitPerPageMap; j < grandTotalMap; j++) {
      $(".maps_section .maps_section_org:eq(" + j + ")").show();
    }

    $(
      ".maps_pagination li.current_map_page:eq(" + (currentPageMap - 1) + ")"
    ).addClass("active");
  }
});

$(".previous_map_page").on("click", function () {
  let currentPageMap = $(".maps_pagination li.active").index();
  if (currentPageMap === 1) {
    return false;
  } else {
    currentPageMap--;
    $(".maps_pagination li").removeClass("active");
    $(".maps_section .maps_section_org").hide();

    let grandTotalMap = limitPerPageMap * currentPageMap;

    for (let j = grandTotalMap - limitPerPageMap; j < grandTotalMap; j++) {
      $(".maps_section .maps_section_org:eq(" + j + ")").show();
    }

    $(
      ".maps_pagination li.current_map_page:eq(" + (currentPageMap - 1) + ")"
    ).addClass("active");
  }
});
