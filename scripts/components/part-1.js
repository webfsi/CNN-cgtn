import gsap from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap-custom/GSDevTools"
import locomotiveScroll from 'locomotive-scroll';
import utils from '../utils';
import { nodeName } from 'jquery';
let { isTabletMd, isMobile } = utils;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

class Part1 {
    constructor({ element }) {
        this.element = element;
    }

    init() {
        this.title = document.querySelector('.preloader_title');

        this.animate();
    }

    animate() {
        this.inner = this.element.querySelectorAll('[data-part-1]');
        // this.heroText = this.element.querySelector('[data-hero-text]');

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: document.querySelector('[data-hero-wrap]'),
            scrub: true,
            start: "top top",
            end: "bottom top",
            // onUpdate: (self) => console.log(self),
            pin: document.querySelector('[data-hero]'),
            pinType: "transform",
            pinSpacing: false,
            markers: false,
        });

        this.animation = gsap.timeline({ paused: true });

        this.animation
            .from(this.inner, {
                y: -window.innerHeight * 0.7,
                duration: 1,
                onComplete: () => {
                },
                ease: 'none'
            })

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: this.element,
            animation: this.animation,
            scrub: true,
            start: "top bottom",
            end: "+=100%",
            // onUpdate: (self) => console.log(self),
            pin: false,
            pinSpacing: false,
            markers: false,
        });

        const listImageContainer = document.querySelector('[data-circle-expand]');

        if(!listImageContainer) return;

        const listImageFigure = listImageContainer.querySelector('figure');
        const listImageEnd = document.querySelector('[data-circle-expand-end]');
        const listImageStart = document.querySelector('[data-circle-expand-start]');

        setTimeout(() => {
            let listImageContainerRect = listImageContainer.getBoundingClientRect();
            let listImageEndRect = listImageEnd.getBoundingClientRect();
    
            let listImageFigureEndY = listImageEndRect.y - listImageContainerRect.y - ( (listImageContainerRect.height - listImageEndRect.height) / 2);
            // console.log(listImageFigureEndY);
            
            this.imageAnimation = gsap.timeline({ paused: true });
    
            let ease = 'none';
    
            this.imageAnimation
                .fromTo(listImageFigure, {
                    y: '-9%',
                    x: '10%',
                    clipPath: 'inset(9% 30% 69% 34% round 100px)',
                }, {
                    clipPath: 'inset(0% 0% 0% 0% round 0px)',
                    y: '0%',
                    x: '0%',
                    duration: 1,
                    ease: 'power2.in'
                }, '0')
                .to(listImageContainer, {
                    y: listImageFigureEndY, //y - y - ((h - h) / 2)
                    duration: 1,
                    ease: ease
                }, '0')
                
    
            ScrollTrigger.create({
                scroller: '[data-scroll-container]',
                trigger: listImageStart,
                endTrigger: listImageEnd,
                animation: this.imageAnimation,
                scrub: 0.4,
                start: "center center",
                end: "center center+=60",
                pin: false,
                pinSpacing: false,
                markers: false,
            });
        }, 2000)

        const silkStepsWrap = document.querySelector('.silk-steps_wrap');
        const silkStepsElems = document.querySelectorAll('.silk-steps div');
        const silkStepsMenu = document.querySelector('.silk-steps_menu');

        this.silkStepsAnimation = gsap.timeline({ paused: true });

        this.silkStepsAnimation
            .fromTo(silkStepsElems, {
                x:-100,
                opacity:0
            }, {
                y:0,
                x:0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.3,
                ease: 'power2.out'
            })
            .from(silkStepsMenu, {
                y: 40,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, '-=0.3')

        ScrollTrigger.create({
            scroller: '[data-scroll-container]',
            trigger: silkStepsWrap,
            // animation: this.silkStepsAnimation,
            scrub: 0.4,
            start: (isMobile ? 'top ' : "center ") + '70%',
            onEnter: () => {
                this.silkStepsAnimation.play();
            },
            // end: "+="+(listImageFigureEndY+100-60),
            end: "center top",
            // onUpdate: (self) => console.log(self),
            pin: false,
            pinSpacing: false,
            markers: false,
        });
    }
}

export default function () {

    const part1Element = document.querySelector('[data-part-1-wrap]');

    if(part1Element) {
        let part1 = new Part1({
            element: part1Element
        });

        part1.init();
    }
}
