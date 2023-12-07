import $ from "jquery";

//cnn bar

function initCnnBar() {
    function initBar() {
      // Setup social share menu
      var shareEl = barEl.querySelector("[data-share]");
      var shareToggleEl = barEl.querySelector("[data-share-toggle]");

      $('body').on('click', '[data-share-toggle]', function() {
        $('[data-share]').toggleClass('cnn-bar__share--active');
      })

      // if (shareToggleEl) {
      //   shareToggleEl.addEventListener(
      //     "click",
      //     function () {
      //       if (shareEl.classList.contains("cnn-bar__share--active")) {
      //         shareEl.classList.remove("cnn-bar__share--active");
      //       } else {
      //         shareEl.classList.add("cnn-bar__share--active");
      //       }
      //     },
      //     false
      //   );
      // }

      // Set up scroll handler
      document.addEventListener(
        "scroll",
        function () {
          window.requestAnimationFrame(barOnScroll);
        },
        { passive: true }
      );
    }

    function barOnScroll() {
      // Get current scroll position
      var sPos =
        typeof window.scrollY === "undefined"
          ? window.pageYOffset
          : window.scrollY;

      if (sPos < 30) {
        if (barEl.classList.contains("cnn-bar--fixed")) {
          barEl.classList.remove("cnn-bar--fixed");
        }
      } else {
        if (!barEl.classList.contains("cnn-bar--fixed")) {
          barEl.classList.add("cnn-bar--fixed");
        }
      }
    }

    // Get main element
    var barEl = document.getElementById("cnn-bar");
    if (barEl) {
      initBar();
    }
  }

  export default () => {
    initCnnBar();
  }