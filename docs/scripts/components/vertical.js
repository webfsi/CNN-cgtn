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
        const textSticky = this.element.querySelector('[data-vertical-text-sticky]');
        console.log(textSticky);
        const textTop = this.element.querySelector('[data-vertical-text-top]');
        const text = this.element.querySelector('[data-vertical-text]');

        if(textSticky) {

            console.log(textTop.offsetHeight - text.offsetHeight)
            ScrollTrigger.create({
                scroller: '[data-scroll-container]',
                trigger: textSticky,
                endTrigger: this.element,
                // animation: this.animation,
                scrub: true,
                start: "center center+=30",
                end: () => `+=${textTop.offsetHeight - text.offsetHeight}`,
                invalidateOnRefresh: true,
                // onUpdate: (self) => console.log(self),
                pin: textSticky,
                pinType: "transform",
                pinSpacing: false,
                markers: false,
            });
        } else {
            ScrollTrigger.create({
                scroller: '[data-scroll-container]',
                trigger: this.element.querySelector('[data-vertical-text-trigger]'),
                endTrigger: this.element,
                // animation: this.animation,
                scrub: true,
                start: "center center+=40",
                end: "bottom bottom",
                // onUpdate: (self) => console.log(self),
                pin: this.element.querySelector('[data-vertical-text]'),
                pinType: "transform",
                pinSpacing: false,
                markers: false,
            });
        }
    }
}

export default function () {

    if(isPortrait) return; 

    const componentElements = document.querySelectorAll('[data-vertical-wrap]');

    console.log(componentElements, 'componentElements')

    componentElements.forEach((element) => {
        let component = new Component({
            element: element
        });

        component.init();
    })
}
