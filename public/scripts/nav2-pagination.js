"use strict";

// $("body").hide(); // Test to see if this script is connected to index.ejs

let numberOfItems = $(".location_section .location_section_org").length;
let limitPerPage = 4;

$(
  ".location_section .location_section_org:gt(" + (limitPerPage - 1) + ")"
).hide();

let totalPages = Math.ceil(numberOfItems / limitPerPage);

$(".location_pagination").append(
  "<li class='page-item current_page active'><a href='javascript:void(0)'>" +
    1 +
    "</a></li>"
);

for (let i = 2; i <= totalPages; i++) {
  $(".location_pagination").append(
    "<li class='page-item current_page'><a href='javascript:void(0)'>" +
      i +
      "</a></li>"
  );
}

$(".location_pagination").append(
  "<li class='page-item next_page'><a href='javascript:void(0)' aria-label='Next'><span aria-hidden='true'>&raquo</span></a></li>"
);

$(".location_pagination li.current_page").on("click", function () {
  if ($(this).hasClass("active")) {
    return false;
  } else {
    let currentPage = $(this).index();
    $(".location_pagination li").removeClass("active");
    $(this).addClass("active");
    $(".location_section .location_section_org").hide();

    let grandTotal = limitPerPage * currentPage;

    for (let j = grandTotal - limitPerPage; j < grandTotal; j++) {
      $(".location_section .location_section_org:eq(" + j + ")").show();
    }
  }
});

// Next Button Functionality

$(".next_page").on("click", function () {
  let currentPage = $(".location_pagination li.active").index();
  if (currentPage === totalPages) {
    return false;
  } else {
    currentPage++;
    $(".location_pagination li").removeClass("active");
    $(".location_section .location_section_org").hide();

    let grandTotal = limitPerPage * currentPage;

    for (let j = grandTotal - limitPerPage; j < grandTotal; j++) {
      $(".location_section .location_section_org:eq(" + j + ")").show();
    }

    $(
      ".location_pagination li.current_page:eq(" + (currentPage - 1) + ")"
    ).addClass("active");
  }
});

$(".previous_page").on("click", function () {
  let currentPage = $(".location_pagination li.active").index();
  if (currentPage === 1) {
    return false;
  } else {
    currentPage--;
    $(".location_pagination li").removeClass("active");
    $(".location_section .location_section_org").hide();

    let grandTotal = limitPerPage * currentPage;

    for (let j = grandTotal - limitPerPage; j < grandTotal; j++) {
      $(".location_section .location_section_org:eq(" + j + ")").show();
    }

    $(
      ".location_pagination li.current_page:eq(" + (currentPage - 1) + ")"
    ).addClass("active");
  }
});
