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
        gsap.delayedCall(1, ()=>{
            // this.heroAnimation.play();
            ev('preloaderDone', {  });
        })

        gsap.to(this.element, {
            opacity: 0,
            duration: 2,
            delay: 1,
            ease: 'power2.out',
            onComplete: () => {
                gsap.set(this.element, {
                    display: 'none'
                });
            }
        })
    }
}

export default function () {

    const componentElement = document.querySelector('.preloader');

    if(componentElement) {
        let component = new Component({
            element: componentElement
        });

        component.init();
    }
}
