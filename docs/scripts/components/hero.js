import gsap from 'gsap';
// const imagesLoaded = require('imagesloaded');

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap-custom/GSDevTools"
import locomotiveScroll from 'locomotive-scroll';
import utils from '../utils';
let { isTouchDevice, onSwipe, Wheel, isMobile, isPortrait, triggerEventOnce } = utils;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

class Hero {
    constructor({ element, onLoad }) {
        this.element = element;
        this.onLoad = onLoad;
    }

    init() {
        this.title = document.querySelector('.preloader_title');
        this.hero3ElementsWrap = document.querySelector('.hero-3-wrap');

        this.animateHero();
        this.animateA3Hero();
    }

    animateHero() {
        this.heroTitle = this.element.querySelector('[data-hero-title]');
        this.heroText = this.element.querySelector('[data-hero-text]');
        this.heroHeader = this.element.querySelector('[data-hero-header]');
        this.heroBg = this.element.querySelector('[data-hero-bg]');
        this.heroBgMain = this.element.querySelector('[data-hero-bg-main]');
        this.heroShip = this.element.querySelector('[data-hero-ship]');
        this.preloader = document.querySelector('.preloader');

        lscroll.stop();

        this.heroAnimation = gsap.timeline({ paused: true, onComplete:() => {
            lscroll.start();
            // window.dispatchEvent(new Event('resize'));
        } });

        const heroChars = new SplitText(this.heroTitle, { type: "chars" });
        const heroTextChars = new SplitText(this.heroText, { type: "chars" });

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

        this.heroAnimation
            .set(this.heroTitle, {
                opacity: 1
            })
            .from(heroChars.chars, animationSettings, '+=0.2')
            .from(heroTextChars.chars, animationSettings, '-=0.7')

        if(this.onLoad && !this.hero3ElementsWrap) {
            this.heroAnimation
                .from(this.heroBgMain, {
                    y: 120,
                    duration: 2,
                    ease: 'power2.out'
                }, '0')
        }

        if(this.heroShip && this.onLoad) {
            this.heroAnimation
                .from(this.heroShip , {
                    x: 120,
                    y: 40,
                    duration: 2,
                    ease: 'power2.out'
                }, '0')
        }

        document.addEventListener("preloaderDone", () => {
            this.heroAnimation.play();
        }, { once: true });

        document.addEventListener("newPage", () => {
            this.heroAnimation.play();
        }, { once: true });

        document.addEventListener("initialize", () => {
            if(!this.onLoad) {
                setTimeout(() => {
                    gsap.set(this.heroTitle, {
                        opacity: 0
                    })
                    heroChars.revert();
                    heroTextChars.revert();
                }, 150)
            }
        }, { once: true });
    }

    animateA3Hero() {

        if(!this.onLoad) return;

        this.hero3ElementsWrap && this.hero3ElementsWrap.querySelectorAll('div').forEach((element) => {
            const values = element.dataset.show.split(' ');

            gsap.set(element, {
                transformOrigin: 'left bottom'
            })

            this.heroAnimation
                .from(element, {
                    x: values[0],
                    y: values[1],
                    rotate: values[2] || 0,
                    duration: 1.5,
                    ease: 'power2.out',
                }, '0.1')

            // GSDevTools.create({animation: this.heroAnimation})
        })

        this.heroAnimation
            .to({}, {
                onComplete: () => {
                    console.log('done');
                    // ScrollTrigger.refresh();
                    // ScrollTrigger.update();
                    window.dispatchEvent(new Event('resize'));
                }
            }, '-=1.4')
    }
}

export default function ({ onLoad = true, element } = arguments) {

    console.log(onLoad)

    const heroElement = document.querySelector('[data-component="hero"]');

    if(heroElement || !onLoad) {
        // console.log(123);
        let hero = new Hero({
            element: onLoad ? heroElement : element ? element : document,
            onLoad
        });

        hero.init();
    }
}
