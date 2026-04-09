jQuery(document).ready(function ($) {
  // Slideshow
  const swiperSlideshow = new Swiper("#slideshow", {
    direction: "horizontal",
    loop: false,
    navigation: {
      nextEl: ".slideshow-navigation-button.next",
      prevEl: ".slideshow-navigation-button.prev",
    },
    slidesPerView: 3,
    spaceBetween: 40,
    breakpoints: {
      1720: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      },
      0: {
        slidesPerView: 1.25,
        spaceBetween: 30,
      },
    },
  });

  // Gallery
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
        768: {
          slidesPerView: 1.1,
          spaceBetween: 40,
          width: 553,
        },
        640: {
          slidesPerView: 1.1,
          spaceBetween: 20,
          width: 553,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
          width: 460,
        },
        390: {
          slidesPerView: 1,
          spaceBetween: 20,
          width: 302,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
          width: 240,
        },
        0: {
          slidesPerView: 1.1,
          spaceBetween: 20,
          width: 240,
        },
      },
    });

    // Apply fade-in effect to all images in the mobile gallery
    $("#product-gallery-mobile .swiper-slide img").each(function () {
      handleImageFadeIn($(this));
    });
  }

  // Function to handle image fade-in
  function handleImageFadeIn($image) {
    // Remove any existing classes first
    $image.removeClass("fade-in loaded");

    // Force a reflow to ensure the transition works
    $image[0].offsetHeight;

    // Add fade-in class
    $image.addClass("fade-in");

    // Check if image is already loaded
    if ($image[0].complete) {
      $image.addClass("loaded");
    } else {
      // Add loaded class when image loads
      $image.on("load", function () {
        $(this).addClass("loaded");
      });
    }
  }

  // Initialize on page load
  initProductGalleryMobile();

  // Add fade-in to initial images
  $(
    ".main-image img, .gallery-thumbs img, #product-gallery-mobile .swiper-slide img"
  ).each(function () {
    handleImageFadeIn($(this));
  });
  // Tabs
  $(".tab-button").click(function () {
    const tab = $(this).data("tab");

    // Update buttons
    $(".tab-button").removeClass("active");
    $(this).addClass("active");

    // Update panels
    $(".tab-panel").removeClass("active");
    $("#" + tab).addClass("active");
  });

  // Variations
  if ($(".variations_form").length) {
    $(".variations_form").wc_variation_form();

    // Initialize custom select
    $(".custom-select-wrapper").each(function () {
      var $wrapper = $(this);
      var $trigger = $wrapper.find(".custom-select-trigger");
      var $options = $wrapper.find(".custom-select-options");
      var $select = $wrapper.find("select");
      var $optionsList = $wrapper.find(".custom-select-option");

      // Toggle dropdown
      $trigger.on("click", function (e) {
        e.stopPropagation();
        $wrapper.toggleClass("open");
      });

      // Handle option selection
      $optionsList.on("click", function () {
        var value = $(this).data("value");
        var attribute = $(this).data("attribute");
        var displayValue = $(this).text().trim();
        var currentVariationId = $(".main-image img").data("variation-id");

        // Update selected value display with original value
        $wrapper.find(".selected-value").text(displayValue);

        // Update hidden select
        $select.val(value).trigger("change");

        // Update selected state
        $optionsList.removeClass("selected");
        $(this).addClass("selected");

        // Close dropdown
        $wrapper.removeClass("open");

        // Update URL with selected variation - this will reload the page
        updateVariationURL();
      });

      // Close dropdown when clicking outside
      $(document).on("click", function (e) {
        if (!$(e.target).closest(".custom-select-wrapper").length) {
          $wrapper.removeClass("open");
        }
      });
    });

    // Trigger change event for default selection
    $(".custom-select-wrapper select").each(function () {
      $(this).trigger("change");
    });

    // Function to update URL with selected variations
    function updateVariationURL() {
      const selectedVariations = {};
      $(".custom-select-wrapper select").each(function () {
        const attr = $(this).data("attribute");
        selectedVariations[attr] = $(this).val();
      });

      // Create URL parameters
      const params = new URLSearchParams(window.location.search);
      Object.keys(selectedVariations).forEach((attr) => {
        // Convert to URL-friendly format (matching PHP helper function)
        const value = selectedVariations[attr]
          .normalize("NFD") // Decompose characters
          .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
          .toLowerCase() // Convert to lowercase
          .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
          .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
        params.set(`attribute_${attr}`, value);
      });

      // Update URL and reload page to get fresh content
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.location.href = newUrl;
    }

    // Initialize variations from URL parameters on page load
    function initializeFromURL() {
      const params = new URLSearchParams(window.location.search);
      let hasVariations = false;

      $(".custom-select-wrapper select").each(function () {
        const attr = $(this).data("attribute");
        const urlValue = params.get(`attribute_${attr}`);

        if (urlValue) {
          hasVariations = true;

          // Find the matching option by comparing slugified values
          const $wrapper = $(this).closest(".custom-select-wrapper");
          let foundOption = null;

          $wrapper.find(".custom-select-option").each(function () {
            const originalValue = $(this).data("value");
            const slugifiedValue = originalValue
              .normalize("NFD") // Decompose characters
              .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
              .toLowerCase() // Convert to lowercase
              .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
              .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

            if (slugifiedValue === urlValue) {
              foundOption = $(this);
              return false; // Break the loop
            }
          });

          if (foundOption) {
            const originalValue = foundOption.data("value");
            $(this).val(originalValue).trigger("change");

            // Update the custom select display with original value
            $wrapper.find(".selected-value").text(foundOption.text().trim());
            $wrapper.find(".custom-select-option").removeClass("selected");
            foundOption.addClass("selected");
          }
        }
      });

      if (hasVariations) {
        // Trigger change on the last select to update price
        $(".custom-select-wrapper select").last().trigger("change");
      }
    }

    // Call initialization on page load
    initializeFromURL();
  }

  // Accordion
  $(".accordion-header").on("click", function () {
    const $item = $(this).closest(".accordion-item");
    const $content = $item.find(".accordion-content");
    const $contentInner = $content.find(".accordion-content-inner");

    if ($item.hasClass("active")) {
      // Close this item
      $content.css("height", "0");
      $item.removeClass("active");
    } else {
      // Open this item
      const contentHeight = $contentInner.outerHeight();
      $content.css("height", contentHeight + "px");
      $item.addClass("active");
    }
  });

  // Handle window resize to recalculate heights of open sections
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      $(".accordion-item.active").each(function () {
        const $content = $(this).find(".accordion-content");
        const $contentInner = $content.find(".accordion-content-inner");
        $content.css("height", $contentInner.outerHeight() + "px");
      });
    }, 250);
  });
});
