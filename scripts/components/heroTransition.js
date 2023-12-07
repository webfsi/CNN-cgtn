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
        this.hero3ElementsWrap = document.querySelector('[data-scroll-container] .hero-3-wrap');
        this.hero5video = document.querySelector('[data-scroll-container] .hero-a5 .hero-video');

        console.log('hero3ElementsWrap', this.hero3ElementsWrap);
        console.log('hero5video', this.hero5video);

        this.animate();
        if(this.hero3ElementsWrap) this.animateA3();
        if(this.hero5video) this.animateA5();
    }

    animate() {
        this.heroHeader = this.element.querySelector('[data-hero-header]');
        this.heroBg = this.element.querySelector('[data-hero-bg]');
        this.heroShip = this.element.querySelector('[data-hero-ship]');

        this.bgHorizontal = this.heroBg.dataset.horizontalMove != undefined;

        this.heroTransition = gsap.timeline({ paused: true });

        this.heroTransition
            .to(this.heroHeader, {
                y: 150,
                opacity: 0,
                duration: 0.5,
            }, '0')

        if(!this.hero3ElementsWrap) {
            this.heroTransition
                .fromTo(this.heroBg, {
                    y: 0,
                }, {
                    y: !this.bgHorizontal ? -250 : 0,
                    x: this.bgHorizontal ? -150 : 0,
                    duration: 1,
                }, '0')
        }

        if(this.heroShip) {
            this.heroTransition
                .set(this.heroBg, {
                    backgroundColor: '#E1DAD0',
                }, '0.5')
                .fromTo(this.heroShip, {
                    y: 0,
                    x: 0
                }, {
                    y: 150,
                    x: -100,
                    duration: 1,
                }, '0')
        }

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: document.querySelector('[data-hero-wrap]'),
            animation: this.heroTransition,
            scrub: true,
            start: "top top",
            end: "bottom top",
            // onUpdate: (self) => console.log(self),
            pin: false,
            pinSpacing: false,
            markers: false,
        });
    }

    animateA3() {
        this.heroTransition
            .to(this.hero3ElementsWrap.querySelector('.hero-3_left-scholars'), {
                y: -150,
                duration: 0.5,
            }, '0')
            .to(this.hero3ElementsWrap.querySelector('.hero-3_right-scholars'), {
                y: -75,
                duration: 0.5,
            }, '0')
            .fromTo(this.element.querySelector('[data-hero-bg-main]'), {
                y: 0,
            }, {
                y: 60,
                duration: 1,
            }, '0')
    }

    animateA5() {
        console.log(this.element, 'hero-a5-anim')
        // this.hero5video = document.querySelector('.hero-a5 .hero-video');
        
        this.heroTransition
            .to(this.hero5video, {
                y: -this.element.offsetHeight/1.3,
                duration: 0.5,
                ease: 'none'
            }, '0')
            // .to(this.hero3ElementsWrap.querySelector('.hero-3_right-scholars'), {
            //     y: -75,
            //     duration: 0.5,
            // }, '0')
            // .fromTo(this.element.querySelector('[data-hero-bg-main]'), {
            //     y: 0,
            // }, {
            //     y: 60,
            //     duration: 1,
            // }, '0')
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
