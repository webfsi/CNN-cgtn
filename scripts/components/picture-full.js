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

        // this.animation
        //     .fromTo(this.element.querySelector('.picture-full_img img'), {
        //         y: 200
        //     }, {
        //         y: -200,
        //         ease: 'linear'
        //     })

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: this.element,
            // animation: this.animation,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
            // onUpdate: (self) => console.log(self),
            pin: this.element.querySelector('.picture-full_img'),
            pinType: "transform",
            pinSpacing: false,
            markers: false,
        });
    }
}

export default function () {

    if(isPortrait) return; 

    const componentElement = document.querySelector('.picture-full');

    if(componentElement) {
        let component = new Component({
            element: componentElement
        });

        component.init();
    }
}
