import gsap from 'gsap';
// const imagesLoaded = require('imagesloaded');

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap-custom/GSDevTools"
import utils from '../utils';
let { isTouchDevice, onSwipe, Wheel, isMobile, isPortrait, triggerEventOnce } = utils;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

class Component {
    constructor({ element, useScrollWidth }) {
        this.element = element;
        this.useScrollWidth = useScrollWidth;
    }

    init() {

        this.animate();
    }

    animate() {
        const horizontal = this.element;
        const horizontalWrap = horizontal.querySelector('[data-horizontal-img-wrap]');
        const horizontalImg = horizontal.querySelector('[data-horizontal-img]');

        this.horizontalAnimation = gsap.timeline({ paused: true });

        const xValue = this.useScrollWidth ? (horizontalImg.scrollWidth - horizontalImg.offsetWidth) : -(horizontalImg.offsetWidth - horizontalWrap.offsetWidth);

        this.horizontalAnimation
            .to(horizontalImg, {
                x: xValue + (Number(horizontal.dataset.offset) || 0),
                duration: 1,
                ease: 'none'
            })
        
        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: horizontal,
            animation: this.horizontalAnimation,
            scrub: 0.5,
            start: "center center+=30",
            end: this.useScrollWidth ? "+=300%" : "+=200%",
            // onUpdate: (self) => console.log(self),
            pin: true,
            pinSpacing: true,
            markers: false,
        });
    }
}

export default function () {

    const componentElement = document.querySelectorAll('[data-horizontal]');

    componentElement.forEach((el) => {
        if(isMobile) {
            $(el).find('picture').removeClass('is-inline');
        }

        if (!(el.dataset.skipMobile && isMobile)) {

            let component = new Component({
                element: el,
                useScrollWidth: el.dataset.usw || false
            });

            component.init();
        }
    })
}
