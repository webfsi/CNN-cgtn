import gsap from 'gsap-custom';
// const imagesLoaded = require('imagesloaded');

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSDevTools } from 'gsap-custom/GSDevTools';
import className from '../className';
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
		this.animate();

		// clip-path: inset(320px 0% 0px 0 round 150px);
		// transform: translate3d(0%,35%,0) scale(2.5);
		// transform: translateY(-903px);
	}

	animate() {
		const imgScaleMove = document.querySelector('[data-img-scale-down-move]');
		const imgScaleClip = document.querySelector('[data-img-scale-down-clip]');
		const imgScaleTransform = document.querySelector('[data-img-scale-down-transform]');
		const smallImg = this.element.querySelector('img');
		const imgScaleEnd = document.querySelector('[data-img-scale-down-end]');

		const imgScaleClipRect = imgScaleClip.getBoundingClientRect();
		const smallImgRect = smallImg.getBoundingClientRect();
		const imgScaleTransformRect = imgScaleTransform.getBoundingClientRect();

		console.log('imgScaleClipRect.height - smallImgRect.height', imgScaleClipRect.height - smallImgRect.height);
		const clipValue = imgScaleClipRect.height - smallImgRect.height;
		const moveValue = imgScaleTransformRect.y - smallImgRect.y + clipValue;
		console.log('imgScaleTransformRect.y - smallImgRect.y', imgScaleTransformRect.y - smallImgRect.y + clipValue);

		const value = isTabletMd ? 100 : 150;

		gsap.set(imgScaleClip, {
			clipPath: `inset(${clipValue}px 0% 0px 0 round ${value}px)`
		});

		gsap.set(imgScaleTransform, {
			scale: 2.5,
			y: '35%'
		});

		gsap.set(imgScaleMove, {
			y: -moveValue
		});

		if (isMobile) {
			// listImageWrap.classList.add('is-finished');

			return;
		}

		// return;

		setTimeout(() => {
			this.imageAnimation = gsap.timeline({ paused: true });

			let ease = 'none';

			this.imageAnimation
				.to(
					imgScaleClip,
					{
						clipPath: 'inset(0px 0% 0px 0 round 15px)',
						duration: 0.5,
						ease: ease
					},
					'0'
				)
				.to(
					imgScaleTransform,
					{
						y: '0%',
						scale: 1,
						duration: 0.5,
						ease: ease
					},
					'0'
				)
				.to(
					imgScaleMove,
					{
						y: 0,
						ease: ease
					},
					'0'
				);

			ScrollTrigger.create({
				scroller: '[data-scroll-container]',
				trigger: this.element,
				endTrigger: imgScaleEnd,
				animation: this.imageAnimation,
				scrub: 0.4,
				start: 'top top+=100',
				// end: "+="+(listImageFigureEndY+100-60),
				end: 'center center+=60',
				// onUpdate: (self) => console.log(self),
				pin: false,
				pinSpacing: false,
				markers: false
			});
		}, 2000);
	}
}

export default function () {
	if (isMobile) return;

	const componentElement = document.querySelector('[data-img-scale-down]');

	if (componentElement) {
		let component = new Component({
			element: componentElement
		});

		component.init();
	}
}
