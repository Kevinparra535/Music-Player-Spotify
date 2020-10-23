$("#button__up").on("click", () => {
  $(".musicPlayer").fadeIn("slow").show();
  $(".main").hide();
});

$("#button__down").on("click", () => {
  $(".musicPlayer").slideDown("slow").hide();
  $(".main").show();
});
