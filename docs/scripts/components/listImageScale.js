import gsap from 'gsap-custom';
// const imagesLoaded = require('imagesloaded');

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap-custom/GSDevTools"
import className from "../className";
import utils from '../utils';
let { isTabletMd, isMobile } = utils;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);
gsap.registerPlugin(className);

class Component {
    constructor({ element }) {
        this.element = element;
    }

    init() {
        console.log(13)

        this.animate();
    }

    animate() {

        const listImageContainer = document.querySelector('[data-img-scale]');
        const listImageWrap = listImageContainer.querySelector('picture');
        const listImage = listImageContainer.querySelector('img');
        const listImageFigure = listImageContainer.querySelector('figure');
        const listImageCaption = listImageContainer.querySelector('.caption');
        const listImageEnd = document.querySelector('[data-img-scale-end]');

        if(isTabletMd) {
            listImageWrap.classList.add('is-finished');

            return;
        }

        const listImageContainerRect = listImageContainer.getBoundingClientRect();
        const listImageEndRect = listImageEnd.getBoundingClientRect();

        setTimeout(() => {
            const listImageFigureEndY = listImageEndRect.y - listImageContainerRect.y - ( (listImageContainerRect.height - listImageEndRect.height) / 2);
            // console.log(listImageFigureEndY);
            
            this.imageAnimation = gsap.timeline({ paused: true });
    
            let ease = 'none';
    
            this.imageAnimation
                .to(listImageWrap, {
                    clipPath: 'inset(20px 0% 20px 6.4% round 15px)',
                    duration: 0.5,
                    ease: ease
                }, '0.5')
                .to(listImage, {
                    x: 0,
                    scale: 1.1,
                    duration: 0.5,
                    ease: ease
                }, '0.5')
                .to(listImageFigure, {
                    y: listImageFigureEndY, //y - y - ((h - h) / 2)
                    duration: 1,
                    ease: ease
                }, '0')
                .to(listImageCaption, {
                    y: -20,
                    x: '6.4%', 
                    duration: 0.5,
                    ease: ease
                }, '0.5')
                .set(listImageWrap, {className: "+=is-finished"})
                
    
            ScrollTrigger.create({
                scroller: '[data-scroll-container]',
                trigger: listImageContainer,
                endTrigger: listImageEnd,
                animation: this.imageAnimation,
                scrub: 0.4,
                start: "top top+=100",
                // end: "+="+(listImageFigureEndY+100-60),
                end: "center center+=60",
                // onUpdate: (self) => console.log(self),
                pin: false,
                pinSpacing: false,
                markers: false,
            });
        }, 2000)
    }
}

export default function () {

    const componentElement = document.querySelector('[data-img-scale]');

    if(componentElement) {
        let component = new Component({
            element: componentElement
        });

        component.init();
    }
}
