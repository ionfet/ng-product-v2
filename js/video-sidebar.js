jQuery(document).ready(function ($) {
  // Video sidebar functionality with responsive support
  $(".video-sidebar").each(function () {
    const $sidebar = $(this);
    const $video = $sidebar.find("video");
    const desktopVideoUrl = $sidebar.data("desktop-video-url");
    const mobileVideoUrl = $sidebar.data("mobile-video-url");
    const defaultVideoUrl = $sidebar.data("default-video-url");

    // Check if we have video URLs
    if (!desktopVideoUrl && !mobileVideoUrl && !defaultVideoUrl) {
      return;
    }

    // Check if video is set to autoplay
    const isAutoplay = $video.attr("autoplay") !== undefined;

    // Function to determine if screen is mobile size
    function isMobileScreen() {
      return window.innerWidth <= 640;
    }

    // Function to determine if device is in landscape orientation
    function isLandscapeOrientation() {
      return window.innerWidth > window.innerHeight;
    }

    // Function to determine if we should use mobile video
    function shouldUseMobileVideo() {
      return isMobileScreen() && !isLandscapeOrientation();
    }

    // Function to get appropriate video URL
    function getVideoUrl() {
      if (shouldUseMobileVideo() && mobileVideoUrl) {
        return mobileVideoUrl;
      } else if (desktopVideoUrl) {
        return desktopVideoUrl;
      } else if (defaultVideoUrl) {
        return defaultVideoUrl;
      }
      return null;
    }

    // Function to switch video source
    function switchVideoSource() {
      const newVideoUrl = getVideoUrl();
      if (newVideoUrl && $video.attr("src") !== newVideoUrl) {
        const currentTime = $video[0].currentTime;
        const wasPaused = $video[0].paused;

        $video.attr("src", newVideoUrl);
        $video.find("source").attr("src", newVideoUrl);

        // Restore playback state
        $video.on("loadedmetadata", function () {
          $video[0].currentTime = currentTime;
          if (!wasPaused) {
            $video[0].play().catch(function (error) {
              console.log("Autoplay prevented:", error);
            });
          }
          $video.off("loadedmetadata");
        });
      }
    }

    // Function to update mobile class
    function updateMobileClass() {
      if (shouldUseMobileVideo()) {
        $sidebar.addClass("video-mobile");
        $video.attr("playsinline", "true");
      } else {
        $sidebar.removeClass("video-mobile");
      }
    }

    // Initial setup - always set the correct video based on current screen size
    const initialVideoUrl = getVideoUrl();
    if (initialVideoUrl) {
      $video.attr("src", initialVideoUrl);
      $video.find("source").attr("src", initialVideoUrl);
    }
    updateMobileClass();

    // Handle video events
    $video.on("loadstart", function () {
      $sidebar.addClass("video-loading");
    });

    $video.on("canplay", function () {
      $sidebar.removeClass("video-loading").addClass("video-loaded");
    });

    $video.on("error", function () {
      console.error("Error loading video:", $video.attr("src"));
    });

    // Handle window resize
    let resizeTimeout;
    $(window).on("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        switchVideoSource();
        updateMobileClass();
      }, 250); // Debounce resize events
    });
  });

  // Lazy loading for videos
  function lazyLoadVideos() {
    $(".video-sidebar").each(function () {
      const $sidebar = $(this);
      const $video = $sidebar.find("video");
      const desktopVideoUrl = $sidebar.data("desktop-video-url");
      const mobileVideoUrl = $sidebar.data("mobile-video-url");
      const defaultVideoUrl = $sidebar.data("default-video-url");

      // Only load video when it comes into view
      if (isElementInViewport($sidebar[0]) && !$video.attr("src")) {
        // Determine appropriate video URL based on screen size and orientation
        let videoUrl = null;
        const isMobileScreen = window.innerWidth <= 640;
        const isLandscape = window.innerWidth > window.innerHeight;
        const shouldUseMobile = isMobileScreen && !isLandscape;

        if (shouldUseMobile && mobileVideoUrl) {
          videoUrl = mobileVideoUrl;
        } else if (desktopVideoUrl) {
          videoUrl = desktopVideoUrl;
        } else if (defaultVideoUrl) {
          videoUrl = defaultVideoUrl;
        }

        if (videoUrl) {
          $video.attr("src", videoUrl);
        }
      }
    });
  }

  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Throttled scroll event for lazy loading
  let scrollTimeout;
  $(window).on("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(lazyLoadVideos, 100);
  });

  // Initial check for videos in viewport
  lazyLoadVideos();
});
