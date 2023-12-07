import gsap from 'gsap';

class Splitter {
    constructor({ element, type }) {
        this.element = element;
        this.type = type;

        this.options = {
            chars: {
                ease: "expo.out",
                yPercent: 0,
                stagger: .06,
                duration: 1.2,
                opacity: 1,
                visibility: "visible",
                delay:0.2
            },
            lines: {
                yPercent: 150,
                duration: 1.5,
                stagger:0.2,
                ease: "expo.out",
                delay: 0.3,
                opacity: 0
            }
        }
    }

    init() {
        let text = this.element;

        this.animation = gsap.timeline({paused: true});

        if(this.type == 'chars') {
            const splitChars = new SplitText(text, { type: "chars", charsClass: "splitted-chars" });

            this.animation
                .from(splitChars.chars, {
                    yPercent: 100,
                    opacity: 0,
                    ease: "expo.out",
                    stagger: .06,
                    duration: 1.2,
                    visibility: "visible",
                    delay:0.2
                })
        } else if(this.type == 'letters') {
            const splitChars = new SplitText(text, { type: "chars, words", charsClass: "splitted-chars" });

            this.animation
                .from(splitChars.chars, {
                    opacity: 0,
                    ease: "expo.out",
                    stagger: .06,
                    duration: 1.2,
                    visibility: "visible",
                    delay:0.2
                })
        } else if(this.type == 'lines') {

            let innerText = text.querySelectorAll('.italic');

            if(innerText) {
                // innerText.classList.remove('italic');
                innerText.forEach(function(el, i) {
                    let innerSplit = new SplitText(el, { type: "words", wordsClass: el.classList.value });
                    // console.log(innerSplit)
                    el.outerHTML = el.innerHTML;
                })
            }

            const splitInner = new SplitText(this.element, { type: "lines", linesClass: "splitted-line-inner" });

            this.animation
                .from(splitInner.lines, {
                    yPercent: 110,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.3,
                    // opacity: 0
                })
        } else {
            this.animation
                .from(this.element, {
                    opacity: 0.1,
                    y: 0,
                    ease: "power2.out",
                    duration: 1,
                    visibility: "visible",
                    delay:0.2
                })
        }

        if(this.type != 'letters' && this.type != 'fadeIn') new SplitText(this.element, { type: "lines", linesClass: "splitted-line" });

        this.element.animation = this.animation;

        this.element.addEventListener('CallEvent', (e) => {
            setTimeout(() => {
                this.animate();
            }, this.element.dataset.delay ? Number(this.element.dataset.delay)*1000 : 0)
        });
    }

    animate() {
        this.animation.play();
    }
}

export default function () {
    document.querySelectorAll('[data-scroll-call="splitter"]').forEach((element) => {
        let splitted = new Splitter({
            element,
            type: element.dataset.split || 'lines'
        });

        splitted.init();
    })
}
