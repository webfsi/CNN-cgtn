// cursorMover.js

import { gsap } from 'gsap';

export default class CursorMover {
	// constructor(selector) {
	//   this.container = document.querySelector(selector);
	//   this.cursor = this.container.querySelector('.btn-cursor');

	//   this.init();
	// }

	// init() {
	//   this.container.addEventListener('mouseenter', () => {
	//     this.container.classList.add('is-moving');
	//   });

	//   this.container.addEventListener('mouseleave', () => {
	//     this.container.classList.remove('is-moving');
	//   });

	//   this.container.addEventListener('mousemove', (event) => {
	//     this.moveCursor(event);
	//   });
	// }

	// moveCursor(event) {
	//   const x = event.clientX;
	//   const y = event.clientY;
	//   const boundingRect = this.container.getBoundingClientRect();

	//   // Позиція курсора відносно контейнера
	//   const localX = x - boundingRect.left;
	//   const localY = y - boundingRect.top;

	//   // Рухаємо курсор
	//   gsap.to(this.cursor, {
	//     x: localX,
	//     y: localY,
	//     duration: 0.3,
	//     ease: 'power3.out'
	//   });
	// }

	constructor(selector) {
		this.containers = document.querySelectorAll(selector);
		this.init();
	}

	init() {
		this.containers.forEach((container) => {
			const cursor = container.querySelector('[data-dragger-btn]');

			// Для миші
			container.addEventListener('mouseenter', () => {
				container.classList.add('is-moving');
				document.body.classList.add('is-moving-cursor');
			});

			container.addEventListener('mousemove', (event) => {
				this.moveCursor(event, container, cursor);
			});

			container.addEventListener('mouseleave', () => {
				container.classList.remove('is-moving');
				document.body.classList.remove('is-moving-cursor');
			});

			// Для сенсорних пристроїв
			container.addEventListener('touchstart', (event) => {
				container.classList.add('is-moving');
				document.body.classList.add('is-moving-cursor');
				this.moveTouchCursor(event, container, cursor);
			});

			container.addEventListener('touchmove', (event) => {
				container.classList.remove('is-moving');
				document.body.classList.remove('is-moving-cursor');
				this.moveTouchCursor(event, container, cursor);
			});
		});
	}

	moveCursor(event, container, cursor) {
		const x = event.clientX;
		const y = event.clientY;
		this.updateCursor(x, y, container, cursor);
	}

	moveTouchCursor(event, container, cursor) {
		const touch = event.touches[0];
		const x = touch.clientX;
		const y = touch.clientY;
		this.updateCursor(x, y, container, cursor);
	}

	updateCursor(x, y, container, cursor) {
		const boundingRect = container.getBoundingClientRect();

		// Позиція курсора відносно контейнера
		const localX = x - boundingRect.left;
		const localY = y - boundingRect.top;

		// Рухаємо курсор
		gsap.to(cursor, {
			x: localX,
			y: localY,
			duration: 0.3,
			ease: 'power3.out'
		});
	}
}
