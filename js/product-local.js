jQuery(document).ready(function ($) {
  // Gallery — mobile Swiper
  let swiperProductGalleryMobile = null;

  function initProductGalleryMobile() {
    swiperProductGalleryMobile = new Swiper("#product-gallery-mobile", {
      direction: "horizontal",
      loop: false,
      slidesPerView: 1.5,
      spaceBetween: 40,
      centeredSlides: false,
      speed: 300,
      breakpoints: {
        768: { slidesPerView: 1.1, spaceBetween: 40, width: 553 },
        640: { slidesPerView: 1.1, spaceBetween: 20, width: 553 },
        480: { slidesPerView: 1, spaceBetween: 20, width: 460 },
        390: { slidesPerView: 1, spaceBetween: 20, width: 302 },
        320: { slidesPerView: 1, spaceBetween: 20, width: 240 },
        0: { slidesPerView: 1.1, spaceBetween: 20, width: 240 },
      },
    });
  }

  initProductGalleryMobile();

  // Custom select (variation picker) — visual only, no page reload
  $(".custom-select-wrapper").each(function () {
    var $wrapper = $(this);
    var $trigger = $wrapper.find(".custom-select-trigger");
    var $optionsList = $wrapper.find(".custom-select-option");
    var $select = $wrapper.find("select");

    $trigger.on("click", function (e) {
      e.stopPropagation();
      $wrapper.toggleClass("open");
    });

    $optionsList.on("click", function () {
      var displayValue = $(this).text().trim();

      $wrapper.find(".selected-value").text(displayValue);
      $optionsList.removeClass("selected");
      $(this).addClass("selected");
      $wrapper.removeClass("open");

      $select.val($(this).data("value"));
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest(".custom-select-wrapper").length) {
        $wrapper.removeClass("open");
      }
    });
  });

  // Quantity +/- buttons
  $(".plus-btn").on("click", function () {
    var $input = $(this).closest(".quantity-wrapper").find(".qty");
    $input.val(parseInt($input.val() || 1) + 1);
  });

  $(".minus-btn").on("click", function () {
    var $input = $(this).closest(".quantity-wrapper").find(".qty");
    var val = parseInt($input.val() || 1);
    if (val > 1) $input.val(val - 1);
  });

  // Accordion
  $(".accordion-header").on("click", function () {
    var $item = $(this).closest(".accordion-item");
    var $content = $item.find(".accordion-content");
    var $contentInner = $content.find(".accordion-content-inner");

    if ($item.hasClass("active")) {
      $content.css("height", "0");
      $item.removeClass("active");
    } else {
      $content.css("height", $contentInner.outerHeight() + "px");
      $item.addClass("active");
    }
  });

  // Recalculate accordion heights on resize
  var resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      $(".accordion-item.active").each(function () {
        var $content = $(this).find(".accordion-content");
        var $contentInner = $content.find(".accordion-content-inner");
        $content.css("height", $contentInner.outerHeight() + "px");
      });
    }, 250);
  });
});
