import gsap from 'gsap';
import LocomotiveScroll from "locomotive-scroll";
// const imagesLoaded = require('imagesloaded');

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap-custom/GSDevTools"
import utils from '../utils';
let { isTouchDevice, onSwipe, Wheel, isMobile, isPortrait, triggerEventOnce } = utils;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

class Component {
    constructor({ element }) {
        this.element = element;
    }

    init() {
        this.initialize();

        function setWindowHeight() {
          let winHeight = window.innerHeight - 60 + 'px';
          // console.log(window.innerHeight);
          document.documentElement.style.setProperty('--win-height', window.innerHeight + 'px');
          document.documentElement.style.setProperty('--win-width', window.innerWidth);
        }
      
        setWindowHeight();
      
        $(window).on('resize', () => {
        //   setWindowHeight();
        })
        
    }

    destroy() {
        // window.scrolltrigger = ScrollTrigger;
        // console.log(ScrollTrigger)
        ScrollTrigger.getAll().forEach(function(instance){
            instance.kill();
        })
        lscroll.destroy();
        if(window.lscrollObserver) window.lscrollObserver.unobserve();
        gsap.killTweensOf("*");
        gsap.globalTimeline.clear();

        this.initialize();
    }

    initialize() {
        var lscroll = new LocomotiveScroll({
            el: document.querySelector("[data-scroll-container]"),
            scrollFromAnywhere: true,
            smooth: true,
            smartphone: {
                smooth: true,
                direction: "vertical",
            },
            tablet: {
                smooth: true,
                direction: "vertical",
            },
            lerp: 0.05,
            multiplier: isMobile ? 1 : 0.6,
            getDirection: true,
        });

        // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
        ScrollTrigger.scrollerProxy("[data-scroll-container]", {
            scrollTop(value) {
                return arguments.length
                    ? lscroll.scrollTo(value, 0, 0)
                    : lscroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: document.querySelector("[data-scroll-container]").style.transform
                ? "transform"
                : "fixed",
        });

        window.lscroll = lscroll;

        // ScrollTrigger.addEventListener('refresh', () => lscroll.update());

        lscroll.on("scroll", function (args) {
            // console.log(123)
            ScrollTrigger.update();

            ev("ScrollEvent", { args });

            var instance = lscroll.scroll.instance;
        });

        lscroll.on("call", function (value, way, obj) {
            ev("CallEvent", {
                value,
                way,
                obj,
                direction: lscroll.scroll.instance.direction,
            }, obj.el);
        });

        window.lscrollObserver = new ResizeObserver(() => {lscroll.update(); console.log('update')}).observe(
            document.querySelector("[data-scroll-container]")
        );
    }
}

export default function () {

    // const componentElement = document.querySelector('[data-component="hero"]');

    // if(componentElement) {
    let component = new Component({
        element: document
    });

    window.smoothScroll = component;

    component.init();
    // }
}
