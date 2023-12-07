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
		this.animateHorizontal();
	}

	animateHorizontal() {
		let self = this;
		this.isHz = false;
		this.current = 0;

		$('body').on('click', '.btn-expand, .is-hz:not(.is-inline)', function () {
			const ignoreLandscape = $(this).attr('data-ignore-landscape') !== undefined;
			if (ignoreLandscape && !isPortrait) return;

			self.isHz = $(this).hasClass('is-hz');
			self.isHz ? (self.current = 2) : (self.current = 0);
			$('.lightbox').addClass('is-horizontal');
			lscroll.stop();

			self.horizontal = true;

			const $lightBoxImg = $('.lightbox_img-wrap img');
			const lightBoxImg = $lightBoxImg[0];

			gsap.set(lightBoxImg, {
				opacity: 1
			});

			$lightBoxImg.wrap('<div class="lightbox_img-scroller"></div>');

			lightBoxImg.src = $(this).data('src');

			if (lightBoxImg.src.indexOf('article-3/the-eighteen-scholars') > -1) {
				$('.lightbox_control.-left').attr('data-analytics-mobile', '2022-cgtn-af3-img1-m-left');
				$('.lightbox_control.-right').attr('data-analytics-mobile', '2022-cgtn-af3-img1-m-right');
			}
			if (lightBoxImg.src.indexOf('article-3/scholars-of-the-liuli-hall') > -1) {
				$('.lightbox_control.-left').attr('data-analytics-mobile', '2022-cgtn-af3-img2-m-left');
				$('.lightbox_control.-right').attr('data-analytics-mobile', '2022-cgtn-af3-img2-m-right');
			}

			const scroller = document.querySelector('.lightbox_img-scroller');

			console.log(self.isHz);

			if (self.isHz) {
				setTimeout(() => {
					scroller.scroll({
						top: 0,
						left: 10000
					});
				}, 20);
			}

			setTimeout(() => {
				$('.lightbox').addClass('is-active');
			}, 21);
		});

		// let current = self.isHz ? 2 : 0;

		$('.lightbox_control.-right').click(function () {
			scrollNext();
		});

		$('.lightbox_control:not(.-right)').click(function () {
			scrollPrev();
		});

		const scrollNext = () => {
			const scroller = document.querySelector('.lightbox_img-scroller');
			const counter = 3;

			if (self.current == counter - 1) return;

			self.current++;

			scroller.scroll({
				top: 0,
				left: (scroller.scrollWidth / 2) * self.current - window.innerWidth / 2,
				behavior: 'smooth'
			});
		};

		const scrollPrev = () => {
			const scroller = document.querySelector('.lightbox_img-scroller');
			const counter = 3;

			if (self.current == 0) return;

			self.current--;

			scroller.scroll({
				top: 0,
				left: (scroller.scrollWidth / 2) * self.current - window.innerWidth / 2,
				behavior: 'smooth'
			});
		};
	}

	animate() {
		let prevPosition;
		let thumbImage;
		let isTransitioning = false;
		let isCropped = false;

		let self = this;

		$('body').on('click', 'picture:not(.is-inline):not(.is-hz)', function () {
			if (isTransitioning || isMobile) return;

			isTransitioning = true;

			isCropped = $(this).hasClass('is-cropped');

			$('.lightbox').addClass('is-active');
			lscroll.stop();

			const $image = $(this).find('img');
			thumbImage = $image;
			// const [width, height] = $image.data('size').split('x');

			const lightBoxImg = $('.lightbox_img-wrap img')[0];

			lightBoxImg.src = $image.attr('src');

			const lightBoxImgBounding = lightBoxImg.getBoundingClientRect();

			const lightBoxImgCenter = getCenter(lightBoxImgBounding);
			const thumbImgCenter = getCenter($image[0].getBoundingClientRect());

			const lightBoxStart = {
				x: thumbImgCenter.x - lightBoxImgCenter.x,
				y: thumbImgCenter.y - lightBoxImgCenter.y,
				scale: $image.width() / lightBoxImgBounding.width
			};

			prevPosition = lightBoxStart;

			gsap.set(lightBoxImg, {
				...lightBoxStart,
				opacity: 1
			});

			// gsap.set($image, {
			//   opacity: 0
			// })

			gsap.to(lightBoxImg, {
				x: 0,
				y: 0,
				scale: 1,
				duration: 0.5,
				ease: 'power2.out',
				onComplete: () => {
					isTransitioning = false;
				}
			});
		});

		//100,1500, o6

		$('.lightbox_close, .lightbox_mask').click(function () {
			isTransitioning = true;
			const lightBoxImg = $('.lightbox_img-wrap img')[0];

			$('.lightbox').removeClass('is-active');

			if (self.horizontal) {
				const $lightBoxImg = $('.lightbox_img-wrap img');

				gsap.to(lightBoxImg, {
					opacity: 0,
					duration: 0.5,
					onComplete: () => {
						isTransitioning = false;
						lscroll.start();

						$('.lightbox').removeClass('is-horizontal');

						$lightBoxImg.unwrap();

						self.horizontal = false;
					}
				});
				// isTransitioning = false;
				// lscroll.start();

				return;
			}

			gsap.to(lightBoxImg, {
				opacity: isCropped || isMobile ? 0 : 1,
				duration: 0.5
			});

			gsap.to(lightBoxImg, {
				...prevPosition,
				duration: 0.5,
				onComplete: () => {
					// gsap.set(thumbImage, {
					//   opacity: 1
					// })
					gsap.to(lightBoxImg, {
						opacity: 0,
						duration: 0.3,
						onComplete: () => {
							isTransitioning = false;
							lscroll.start();
							gsap.set(lightBoxImg, {
								x: 0,
								y: 0,
								scale: 1
							});
						}
					});
				}
			});
		});

		function getCenter(bounding) {
			return {
				x: bounding.x + bounding.width / 2,
				y: bounding.y + bounding.height / 2
			};
		}
	}
}

export default function () {
	const componentElement = document.querySelector('.lightbox');

	if (componentElement) {
		let component = new Component({
			element: componentElement
		});

		component.init();
	}
}
