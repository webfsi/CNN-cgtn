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
    }
}

export default function () {

    const componentElement = document.querySelector('[data-component="hero"]');

    if(componentElement) {
        let component = new Component({
            element: componentElement
        });

        component.init();
    }
}
