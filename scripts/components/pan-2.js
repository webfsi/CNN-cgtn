import gsap from 'gsap';
// const imagesLoaded = require('imagesloaded');

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSDevTools } from 'gsap-custom/GSDevTools';
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
		this.imageWrap = this.element.querySelector('.c-pan-2_img');
		this.image = this.element.querySelector('.c-pan-2_img img');
		this.wrap = this.element.querySelector('.c-pan-2_img-wrap');

		ScrollTrigger.create({
			scroller: '[data-scroll-container]',
			trigger: this.element,
			invalidateOnRefresh: true,
			// animation: gsap.fromTo(
			// 	this.image,
			// 	{
			// 		y: 0
			// 	},
			// 	{
			// 		y: () => (this.imageWrap.offsetHeight - this.image.offsetHeight < 0 ? this.imageWrap.offsetHeight - this.image.offsetHeight : 0),
			// 		ease: 'none'
			// 	}
			// ),
			scrub: true,
			start: 'top bottom',
			end: 'bottom top',
			// onUpdate: (self) => console.log(self),
			pin: this.imageWrap,
			pinType: 'transform',
			pinSpacing: false,
			markers: false
		});
		ScrollTrigger.create({
			scroller: '[data-scroll-container]',
			trigger: this.element,
			invalidateOnRefresh: true,
			animation: gsap.fromTo(
				this.image,
				{
					y: 0
				},
				{
					y: () => (this.imageWrap.offsetHeight - this.image.offsetHeight < 0 ? this.imageWrap.offsetHeight - this.image.offsetHeight : 0),
					ease: 'none'
				}
			),
			scrub: true,
			start: 'top top',
			end: 'bottom bottom'
		});

		this.wrap && ScrollTrigger.create({
			scroller: '[data-scroll-container]',
			trigger: this.element,
			invalidateOnRefresh: true,
			animation: gsap.fromTo(
				this.wrap,
				{
					y:200,
				},
				{
					y:0,
					ease: 'none'
				}
			),
			scrub: true,
			start: 'top bottom',
			end: 'top top',
		});

		this.wrap && ScrollTrigger.create({
			scroller: '[data-scroll-container]',
			trigger: this.element,
			invalidateOnRefresh: true,
			animation: gsap.fromTo(
				this.wrap,
				{
					y: 0,
				},
				{
					y: -200,
					ease: 'none'
				}
			),
			scrub: true,
			start: 'bottom bottom',
			end: 'bottom top',
		});
	}
}

export default function () {
	if (isMobile) return;

	const componentElement = document.querySelector('.c-pan-2');

	if (componentElement) {
		let component = new Component({
			element: componentElement
		});

		component.init();
	}
}
