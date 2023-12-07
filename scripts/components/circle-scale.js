import gsap from 'gsap';
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

        this.animate();
    }

    animate() {
        this.animation =  gsap.timeline({ paused: true });

        let circleInner = this.element.querySelector('[data-circle-scale-inner]');
        let lightMove = circleInner.dataset.lightMove != undefined;


        if(lightMove) {
            !isPortrait && this.animation
                .fromTo(circleInner, {
                    clipPath: 'inset(5% 0% 0% 5% round 30px)',
                    yPercent: 10,
                    xPercent: 10,
                    transformOrigin: 'right top',
                }, {
                    clipPath: 'inset(0% 0% 0% 0% round 0px)',
                    yPercent: 0,
                    xPercent: 0,
                    ease: 'linear'
                }, '0')
        } else {
            this.animation
                .from(this.element.querySelector('picture'), {
                    scale: 0.7,
                    transformOrigin: 'center top',
                    ease: 'linear'
                }, '0')

            this.animation
                .fromTo(circleInner, {
                    clipPath: 'inset(0% 26% 68% 31% round 170px)',
                    yPercent: 31,
                }, {
                    clipPath: 'inset(0% 0% 0% 0% round 0px)',
                    yPercent: 0,
                    ease: 'linear'
                }, '0')
        }
            
        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: this.element,
            animation: this.animation,
            scrub: 0.5,
            start: "65% bottom",
            end: "center center+=60",
            pin: false,
            pinType: "transform",
            pinSpacing: false,
            markers: false,
        });
    }
}

export default function () {

    const componentElement = document.querySelector('[data-circle-scale]');

    if(componentElement) {
        let component = new Component({
            element: componentElement
        });

        component.init();
    }
}
