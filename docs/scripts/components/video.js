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
		this.isSeeking = false;
	}

	init() {
		this.animate();
	}

	animate() {
		const videoLoop = this.element.querySelector('.hero-video_loop');
		const videoFull = this.element.querySelector('.hero-video_full');
		const $videoOverlay = $('.hero-video_overlay');

		ScrollTrigger.create({
			scroller: '[data-scroll-container]',
			trigger: document.querySelector('[data-hero-wrap]'),
			endTrigger: this.element,
			scrub: true,
			start: 'top top-=100',
			end: 'center top-=100',
			invalidateOnRefresh: true,
			onLeaveBack: () => {
				$videoOverlay.removeClass('is-active');
			},
			onLeave: () => {
				videoFull.pause();
				$videoOverlay.removeClass('is-active');
			},
			onEnter: () => {
				$videoOverlay.addClass('is-active');
			},
			onEnterBack: () => {
				$videoOverlay.addClass('is-active');
			},
			// onUpdate: (self) => console.log(self),
			pin: false,
			pinType: 'transform',
			pinSpacing: false,
			markers: false
		});

		$('.btn-play').click(() => {

			videoFull.play();
			if (!this.element.classList.contains('is-playing')) {
				this.element.classList.add('is-playing');
				videoFull.muted = false;
				videoFull.volume = 1;
				setTimeout(() => {
					videoLoop.pause();
				}, 500);
			}

		});

		this.videoFull = this.element.querySelector('.hero-video_full');

		this.videoFull.addEventListener('play', () => this.handleVideoPlay());
		this.videoFull.addEventListener('pause', () => this.handleVideoPause());
		this.video.addEventListener('seeked', () => this.handleVideoSeeked());
		this.video.addEventListener('seeking', () => this.handleVideoSeeking());
	}

	handleVideoPause() {
		this.isSeeking = true;
		setTimeout(() => {
			if (this.isSeeking) {
				this.element.classList.add('is-pause');
				this.element.classList.remove('is-play');
			}
		}, 100);
		// ... другая логика при паузе ...
	}

	handleVideoPlay() {
		this.isSeeking = false;
		this.element.classList.remove('is-pause');
		this.element.classList.add('is-play');
	}

	handleVideoSeeked() {
		this.isSeeking = false;
	}

	handleVideoSeeking() {
		this.isSeeking = false;
	}
}

export default function () {
	const componentElement = document.querySelector('[data-component="video"]');

	if (componentElement) {
		let component = new Component({
			element: componentElement
		});

		component.init();
	}
}
