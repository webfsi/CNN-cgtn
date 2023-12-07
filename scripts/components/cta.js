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
        this.ctaAnimation = gsap.timeline({ paused: true });

        this.ctaAnimation
            .to(document.querySelector('.cta_bg'), {
                scale: 1.2,
                duration: 1,
                ease: 'none'
            })
        
        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: document.querySelector('.cta'),
            animation: this.ctaAnimation,
            scrub: 0.5,
            start: "top bottom",
            end: "center top",
            // onUpdate: (self) => console.log(self),
            pin: false,
            pinSpacing: false,
            markers: false,
        });
    }
}

export default function () {

    const componentElement = document.querySelector('.cta_bg');

    if(componentElement) {
        let component = new Component({
            element: componentElement
        });

        component.init();
    }
}
