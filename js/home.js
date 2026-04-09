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
});
