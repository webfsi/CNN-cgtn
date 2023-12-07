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
        const pan = document.querySelector('.c-pan');
        const panBg = document.querySelector('.c-pan_bg');
        const panBgInner = panBg.querySelector('.c-pan_bg-inner');
        const panBgImg = panBg.querySelector('.c-pan_bg-img');
        const panBgWrap = panBg.querySelector('.c-pan_bg-wrap');
        const panSnap2 = document.querySelector('[data-pen-snap-2]');

        this.panAnimation = gsap.timeline({ paused: true });

        const clipSize = {
            w: isMobile ? 220 : 280,
            h: isMobile ? 290 : 400
        }

        gsap.set(panBgInner, {
            clipPath: `inset(${(window.innerHeight-60-clipSize.h)/2}px ${(window.innerWidth-clipSize.w)/2}px round 10px)`,
        })

        this.panAnimation
            .to(panBgInner, {
                clipPath: 'inset(0px 0px round 0px)',
                duration: 1,
                ease: 'none'
            })
            .to(panBgImg, {
                scale: 1,
                duration: 1,
                ease: 'none'
            }, '0')

        this.panBgAnimation = gsap.timeline({ paused: true });

        this.panBgAnimation
            .to(panBgImg, {
                x: -(panBgImg.offsetWidth - window.innerWidth),
                duration: 1,
                ease: 'none',
                immediateRender: false,
                // overwrite: 'auto'
            })

        this.panBgImgAnimation = gsap.timeline({ paused: true });

        this.panBgImgAnimation
            .to(panBgWrap, {
                y: -300,
                // paused: true,
                ease: 'none',
                immediateRender: false,
                // overwrite: 'auto'
            })

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: pan,
            animation: gsap.from(panBgInner, {
                y: 50,
                ease: 'none'
            }),
            scrub: 1,
            start: "top top+=85",
            end: "+=50",
            // onUpdate: (self) => console.log(self),
            pin: false,
            pinSpacing: false,
            markers: false,
        });

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: pan,
            animation: this.panAnimation,
            scrub: 0.5,
            start: "top top+=60",
            end: "+=100%",
            // onUpdate: (self) => console.log(self),
            pin: false,
            pinSpacing: false,
            markers: false,
        });

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: pan,
            scrub: true,
            start: "top top+=60",
            end: "bottom top",
            // onUpdate: (self) => console.log(self),
            pinType: 'transform',
            pin: panBg,
            pinSpacing: false,
            markers: false,
        });

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: panSnap2,
            animation: this.panBgAnimation,
            scrub: true,
            start: "top bottom",
            end: "bottom bottom",
            preventOverlaps: true,
            // onUpdate: (self) => console.log(self),
            pin: false,
            pinSpacing: false,
            markers: false,
        });

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: pan,
            animation: this.panBgImgAnimation,
            scrub: true,
            start: "bottom bottom",
            end: "+=100%",
            preventOverlaps: true,
            // onUpdate: (self) => console.log(self),
            pin: false,
            pinSpacing: false,
            markers: false,
        });

        const snap0 = document.querySelector('[data-pen-snap-0]');
        const snap1 = document.querySelector('[data-pen-snap-1]');
        const snap2 = document.querySelector('[data-pen-snap-2]');

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: snap1,
            scrub: false,
            start: "top-=60 bottom",
            end: "bottom-=10 bottom",
            onEnter: () => {
                console.log('enter-1')
                setTimeout(() => {
                    lscroll.stop();

                    lscroll.scrollTo(snap1, {
                        duration: 1000,
                        offset: 0,
                        callback: () => {
                            setTimeout(() => lscroll.start(), 500);
                        }
                    })
                }, 0)
            },
            onEnterBack: () => {
                console.log('enterback-1')
                lscroll.stop();

                setTimeout(() => {
                    lscroll.stop();

                    lscroll.scrollTo(snap0, {
                        duration: 1000,
                        offset: -61,
                        callback: () => {
                            setTimeout(() => lscroll.start(), 500);
                        }
                    })
                }, 0)
            },
            onLeaveBack: () => {
                // console.log('leaveback-1')
            },
            pin: false,
            pinSpacing: false,
            markers: false,
        });

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: snap2,
            scrub: false,
            start: "top bottom",
            end: "bottom-=10 bottom",
            onEnter: () => {
                console.log('enter-2')
                setTimeout(() => {
                    lscroll.stop();

                    lscroll.scrollTo(snap2, {
                        duration: 1000,
                        offset: 0,
                        callback: () => {
                            setTimeout(() => lscroll.start(), 500);
                        }
                    })
                }, 0)
            },
            onEnterBack: () => {
                console.log('enterback-2')

                setTimeout(() => {
                    lscroll.stop();

                    lscroll.scrollTo(snap1, {
                        duration: 1000,
                        offset: -1,
                        callback: () => {
                            setTimeout(() => lscroll.start(), 500);
                        }
                    })
                }, 0)
            },
            onLeaveBack: () => {
                // console.log('leaveback-2')
            },
            pin: false,
            pinSpacing: false,
            markers: false,
        });
    }
}

export default function () {

    const componentElement = document.querySelector('.c-pan');

    if(componentElement) {
        let component = new Component({
            element: componentElement
        });

        component.init();
    }
}
