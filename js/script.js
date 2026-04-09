jQuery(document).ready(function ($) {
  // Back to top
  $("#back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  // Mobile menu
  $("#mobile-menu-button").click(function () {
    $("#mobile-menu").toggleClass("active");
    $(".header").toggleClass("menu-open");
    $(".header__mobile-menu-button").text(
      $("#mobile-menu").hasClass("active") ? "Zavřít" : "Menu"
    );
  });

  // Top banner close
  $("#bannerClose").on("click", function () {
    $("#topBanner").addClass("hidden");
    $("body").removeClass("has-top-bar");
  });

  // Popup open/close
  const popupShownKey = "popupShown";
  const $popupOverlay = $("#popupOverlay");

  const showPopup = function () {
    $popupOverlay.css("display", "flex");
  };

  const hidePopup = function () {
    $popupOverlay.css("display", "none");
    localStorage.setItem(popupShownKey, "true");
  };

  if ($popupOverlay.length && !localStorage.getItem(popupShownKey)) {
    setTimeout(() => {
      showPopup();
    }, 10000);
  }

  $("#popupClose").on("click", function () {
    hidePopup();
  });

  $("#popupOverlay").on("click", function (e) {
    if (e.target === this) {
      hidePopup();
    }
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      hidePopup();
    }
  });
});
