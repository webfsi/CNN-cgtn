import $ from "jquery";
import LocomotiveScroll from "locomotive-scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { GSDevTools } from "gsap-custom/GSDevTools";
import LazyLoad from "vanilla-lazyload";
import className from "./className";

import initAnimations from "./components";

import "./components/video-component-click";

import utils from "./utils";
let {
  isMobile,
  onSwipe,
  Wheel,
  isTouchDevice,
  isTabletSm,
  isPortrait,
  triggerEventOnce,
} = utils;

var ev = function (eventName, data, target) {
  var target = target ? target : document;
  var e = new CustomEvent(eventName, { detail: data });
  target.dispatchEvent(e);
};

window.ev = ev;

$(document).ready(function () {
  // refresh page if orientation change
  window.addEventListener("orientationchange", function () {
    location.reload();
    console.log("orientation change");
  });

  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(className);

  /* Animations */

  initAnimations();

  window.addEventListener(
    "resize",
    function (event) {
      ScrollTrigger.refresh();
    },
    true
  );

  setTimeout(() => {
    lscroll.update();

    const lazyInstance = new LazyLoad({
      container: document.body,
      elements_selector: '[data-component="lazyload"]',
      threshold: window.innerHeight * 4,
      // thresholds: '9000px 0px 0px 0px',
      unobserve_entered: true,
    });

    window.lazyInstance = lazyInstance;

    // document.addEventListener("transitionFinished", () => {
    //   lazyInstance.update();
    // }, { once: false });
  }, 500);

  $("body").on("click", ".watch-video", () => {
    lscroll.stop();
    $(".video-overlay").addClass("is-active");

    $(".video-overlay video")[0].play();
  });

  $("body").on("click", ".video-overlay_close", () => {
    $(".video-overlay").removeClass("is-active");

    $(".video-overlay video")[0].pause();
    lscroll.start();
  });

  $("body").on("click", "[data-linkto]", function (e) {
    e.preventDefault();
    console.log($(this).parent().parent());
    $(this).parent().parent().find("[data-transition]").trigger("click");
  });

});
