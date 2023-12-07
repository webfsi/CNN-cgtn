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
        const hubHeader = document.querySelectorAll('[data-hub-title], [data-hub-subtitle]');
        const hubArticles = document.querySelectorAll('[data-hub-articles] > *');
        // const silkStepsElems = document.querySelectorAll('.silk-steps div');
        // const silkStepsMenu = document.querySelector('.silk-steps_menu');

        const hubHeaderChars = new SplitText(hubHeader, { type: "chars" });

        this.hubAnimation = gsap.timeline({ paused: true });

        const animationSettings = {
            duration: 0.8,
            opacity: 0,
            scale: 1,
            y: 10,
            rotationX: 0,
            transformOrigin: '50% 50% 0',
            ease: 'back',
            stagger: 0.01
        }

        this.hubAnimation
            .from(document.querySelectorAll('.hub-hero_title path'), animationSettings, '+=0.2')
            .from(hubArticles, {
                opacity: 0,
                y: 100,
                ease: "power4.out",
                duration: 1,
                stagger: 0.05
            }, '-=1')

        document.addEventListener("preloaderDone", () => {
            gsap.delayedCall(0.1, () => {
                this.hubAnimation.play();
            })
        }, { once: false });

        // ScrollTrigger.create({
        //     scroller: '[data-scroll-container]',
        //     trigger: silkStepsWrap,
        //     // animation: this.silkStepsAnimation,
        //     scrub: 0.4,
        //     start: "center 70%",
        //     onEnter: () => {
        //         this.silkStepsAnimation.play();
        //     },
        //     // end: "+="+(listImageFigureEndY+100-60),
        //     end: "center top",
        //     // onUpdate: (self) => console.log(self),
        //     pin: false,
        //     pinSpacing: false,
        //     markers: false,
        // });
    }
}

export default function () {

    const componentElement = document.querySelector('.hub-page');

    if(componentElement) {
        let component = new Component({
            element: componentElement
        });

        component.init();
    }
}
