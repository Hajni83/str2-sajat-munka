$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip({
    container: "body",
    trigger: "hover",
    placement: "bottom",
  });

  $("#privacy").on("click", function (event) {
    $("#myModal").modal();
  });

  $("#terms").on("click", function (event) {
    $("#myModal2").modal();
  });

  $("#faq").on("click", function (event) {
    $("#myModal3").modal();
  });
});
