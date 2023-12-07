import gsap from 'gsap';

class MagneticButton {
  constructor(selector, strength = 350) {
    this.strength = strength;
    this.buttons = document.querySelectorAll(selector);
    this.bindEvents();
  }

  bindEvents() {
    this.buttons.forEach((button) => {
      button.addEventListener('mousemove', this.handleMouseMove.bind(this));
      button.addEventListener('mouseout', this.handleMouseOut.bind(this));
    });
  }

  handleMouseMove(event) {
    this.moveMagnet(event);
  }

  handleMouseOut(event) {
    gsap.to(event.currentTarget, 3, {
      x: 0,
      y: 0,
      ease: "power4.out"
    });
  }

  moveMagnet(event) {
    const magnetButton = event.currentTarget;
    const bounding = magnetButton.getBoundingClientRect();

    const distanceX = (event.clientX - bounding.left) - magnetButton.offsetWidth / 2;
    const distanceY = (event.clientY - bounding.top) - magnetButton.offsetHeight / 2;

    gsap.to(magnetButton, 3, {
      x: (distanceX * 0.5) * (this.strength / 100),
      y: (distanceY * 0.5) * (this.strength / 100),
      ease: "power4.out"
    });
  }
}

export default function () {

  // const componentElement = document.querySelector('[data-component="magnetic"]');

  // if(componentElement) {
      let component = new MagneticButton('[data-component="magnetic"]');

      // component.init();
  // }
}