import gsap from 'gsap';
// const imagesLoaded = require('imagesloaded');
import Swiper from 'swiper/swiper-bundle';

import initHero from "./hero";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap-custom/GSDevTools"
import utils from '../utils';

import heroes from './heroes.js';
// import smoothScroll from './smoothScroll';
let { isTouchDevice, onSwipe, Wheel, isMobile, isPortrait, triggerEventOnce } = utils;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

class Component {
    constructor({ element }) {
        this.element = element;

        this.tile = document.querySelector('.tile_hero-wrap');
        this.tilePlaceholder = document.querySelector('.tile-placeholder');
        this.isAnimating = false;
    }

    init() {
        this.animate();
        this.transition();
        this.initWhiteArea();
        this.initStateHandler();
    }

    animate() {
        const self = this;
        this.animattion = gsap.timeline({ paused: true });

        $('.btn-menu').click(function() {
            $('.menu').toggleClass('is-active');
            $(this).toggleClass('is-active');
            
            if($('.menu').hasClass('is-active')) {
                lscroll.stop()
            } else {
                lscroll.start()
            }
        })

        // $('.btn.-continue').click(function(e){
        //     e.preventDefault();

        //     $('.btn-menu').trigger('click');
        // })
    }

    initWhiteArea() {
        window.ScrollTrigger = ScrollTrigger;

        const settings = {
            scroller: "[data-scroll-container]",
            scrub: false,
            start: "top top+=60",
            end: "bottom top+=61",
            pin: false,
            pinSpacing: false,
            markers: false,
            // markers: true,
        };

        setTimeout(() => {
            document.querySelectorAll('[data-white-area]').forEach((elem) => {
                const animationTrigger = ScrollTrigger.create({
                    ...settings,
                    trigger: elem,
                    onToggle: (self) => {
                        if (self.isActive) {
                            $('.btn-menu').addClass('-brown');
                            // console.log('enter', elem)
                        } else {
                            // console.log('leave', elem)
                            $('.btn-menu').removeClass('-brown');
                        }
                    }
                });
            })

            document.querySelectorAll('[data-dark-area]').forEach((elem) => {
                const animationTrigger = ScrollTrigger.create({
                    ...settings,
                    trigger: elem,
                    onToggle: (self) => {
                        if (self.isActive) {
                            $('.btn-menu').removeClass('-brown');
                            console.log('enter', elem)
                        } else {
                            console.log('leave', elem)
                            $('.btn-menu').addClass('-brown');
                        }
                    }
                });
            })
        }, 2500)
    }

    initStateHandler() {
        console.log('initHandler');

        (function(history) {
            var pushState = history.pushState;
            history.pushState = function(state) {
                if (typeof history.onpushstate == "function") {
                    history.onpushstate({
                        state: state
                    });
                }
                return pushState.apply(history, arguments);
            }
        })(window.history);

        window.onpopstate = history.onpushstate = (e) => {
            window.changePage = true;
            if(e.state) {
                this.loadNext(e.state || e.target.location.href);
                return;
            }

            window.location = e.target.location;
        };
    }

    initTiles() {

        this.transitions = document.querySelectorAll('[data-transition]');

        const isHub = $('.hub-page').length;

        $('[data-transitions]').each(function() {
            $(this).find('[data-transition]').each((i, el) => {
                const index = el.dataset.h ? Number(el.dataset.h)+1 : i;
                const string = isHub ? heroes[index].replace(new RegExp("../images", 'g'), "images") : heroes[index];
                $(el).find('.tile_hero-wrap').html(string);
            })
        })

        this.menu = $('.menu');

        console.log(this.menu);

        const setTileClip = () => {
            this.transitions.forEach((element) => {
                const tilePlaceholder = element.querySelector('.tile-placeholder');
                const tile = element.querySelector('.tile_hero-wrap');

                let clip = {
                    x: window.innerWidth - tilePlaceholder.offsetWidth,
                    y: window.innerHeight - tilePlaceholder.offsetHeight
                }
    
                gsap.set(tile, {
                    'clipPath': `inset(0px ${clip.x}px ${clip.y}px 0 round 20px)`
                })
            });
        }

        $(window).on('resize', () => {
            // console.log('resized');
            if(!this.isAnimating) setTileClip();
        });

        !isMobile && new Swiper('.menu .swiper', {
            speed: 1000,
            // spaceBetween: 100,
            slidesPerView: 'auto',
            spaceBetween: 20,
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.menu_tiles-nav .-right',
                prevEl: '.menu_tiles-nav .-left',
            },
            breakpoints: {
                700: {
                    slidesPerView: 3,
                },
            }
        });

        !isMobile && new Swiper('.read-next .swiper', {
            speed: 1000,
            // spaceBetween: 100,
            slidesPerView: 'auto',
            spaceBetween: 30,
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.read-next .-right',
                prevEl: '.read-next .-left',
            },
            breakpoints: {
                700: {
                    slidesPerView: 2,
                },
            }
        });

        setTileClip();

        console.log(document.querySelector('.menu_tiles-nav .-right'));

    }

    refreshMenu() {

        const $newCurrent =  $('.menu [data-transition]').eq(this.currentMenuItem);
        
        console.log(this.currentMenuItem);

        if($('.menu [data-transition].is-current').find('.btn')[0]) {
            $('.menu [data-transition].is-current').find('.btn')[0].outerHTML = '<button type="button" class="btn -arrow btn-hover">Read more</button>';
        }

        $('.menu [data-transition]').removeClass('is-current');

        $newCurrent.addClass('is-current');

        $newCurrent.find('.btn')[0].outerHTML = '<button type="button" class="btn -orange btn-hover -continue">Continue reading</button>';
        
    }

    transition() {

        this.initTiles();

        const self = this;
        
        document.addEventListener("initialize", () => {
            // this.refreshMenu();
        }, { once: false });

        $('body').on('click', '[data-transition]', function (e) {
            if($(this).hasClass('is-current')) {
                $('.btn-menu').trigger('click');

                return;
            }
            self.currentTransition = e.currentTarget;
            self.currentMenuItem = this.dataset.h ? Number(this.dataset.h)+1 : $(this).index();

            gsap.set(e.currentTarget, {
                zIndex: 100
            });

            gsap.set(self.currentTransition, {
                overflow: 'visible'
            });

            const nextUrl = e.currentTarget.getAttribute('href');
            const fullUrl = `${location.origin}${location.pathname}${nextUrl}`;
            setImmediate(function(){
            window.history.pushState(fullUrl, '', fullUrl);
            },100);
        })

        $('body').on('mouseenter', '.read-next_item:not(.-soon), .tile-hover', function() {
            // console.log($(this));
            $(this).find('.btn').addClass("is-hovered");
        });

        $('body').on('mouseleave', '.read-next_item:not(.-soon), .tile-hover', function() {
            $(this).find('.btn').removeClass("is-hovered");
        });
    }

    loadNext(nextHref) {
        this.isAnimating = true;

        const tilePlaceholder = this.currentTransition.querySelector('.tile-placeholder');
        const hero = this.currentTransition.querySelector('.transition-hero');
        const heroShip = this.currentTransition.querySelector('.hero_bg-ship');
        const leftScholar = this.currentTransition.querySelector('.hero-3_left-scholars');
        const tile = this.currentTransition.querySelector('.tile_hero-wrap');
        const heroMain = this.currentTransition.querySelector('.hero-3_bg-main ');

        console.log(leftScholar)
                    
        const placeholderPos = tilePlaceholder.getBoundingClientRect();

        const heroTimeline = gsap.timeline({ paused: true });

        initHero({
            onLoad: false,
            element: hero
        });

        $('.btn-menu').addClass('is-hidden');

        gsap.delayedCall(0.3, () => {
            ev('newPage', {});
        })

        const self = this;
        
        const transitionFunction = 'expo.out';

        // heroTimeline
        //     .set(document.querySelectorAll('.menu_tiles-wrap, .read-next .swiper'), {
        //         x: -document.querySelector('.menu_tiles-wrap').scrollLeft,
        //         'overflow': 'visible',
        //     })
        
        if(!isMobile) {
            heroTimeline
                .set(document.querySelectorAll('.menu_tiles-wrap, .read-next .swiper'), {
                    'overflow': 'visible',
                })
                
            heroTimeline.set(document.querySelectorAll(`.swiper-slide:not(.swiper-slide-visible)`), {
                'opacity': '0',
                'transition': '0s'
            })
        } else {
            heroTimeline
                .set(document.querySelectorAll('.menu_tiles'), {
                    x: -document.querySelector('.menu_tiles').scrollLeft,
                    'overflow': 'visible',
                })
        }

        // console.log(document.querySelectorAll('.tile_hero-wrap .th-a5 .hero-video'))

        heroTimeline
            .to(tile, {
                'clipPath': `inset(0px 0px 0px 0 round 0px)`,
                x: -placeholderPos.left,
                y: -placeholderPos.top,
                ease: transitionFunction,
                duration: 2
            }, '0')
            .to(heroShip, {
                x: 0,
                y: 0,
                scale: 1,
                ease: transitionFunction,
                duration: 2
            }, '0')
            .to(leftScholar, {
                x: 0,
                y: 0,
                scale: 1,
                ease: transitionFunction,
                duration: 2
            }, '0')
            .to(heroMain, {
                x: 0,
                y: 0,
                scale: 1,
                ease: transitionFunction,
                duration: 2
            }, '0')
            .to(tilePlaceholder, {
                opacity:0,
                ease: transitionFunction,
                duration: 0.5
            }, '0')
            .to(this.currentTransition.querySelector('.tile_hero-wrap .th-a5 .hero-video'), {
                opacity:1,
                ease: transitionFunction,
                duration: 1.3
            }, '0.7')
            .to(hero, {
                x: 0,
                y: 0,
                scale:1,
                ease: transitionFunction,
                duration: 2,
                onComplete: () => {
                    // const nextHref = `${location.origin}/contemporary-life/`;

                    // return;

                    fetch(nextHref).then(function (response) {
                        return response.text();
                    }).then((html) => {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(html, 'text/html');

                        // return;

                        document.querySelector('[data-scroll-container]').outerHTML = doc.querySelector('[data-scroll-container]').outerHTML;
                        // document.querySelector('[rel="shortcut icon"]').href = doc.querySelector('[rel="shortcut icon"]').href;
                        
                        gsap.set('.menu', {
                            zIndex: -1,
                        })

                        heroTimeline.revert();

                        // gsap.set(heroTimeline, { clearProps: true });
                        self.isAnimating = false;

                        $('.btn-menu, .menu').removeClass('is-active');

                        const $nextPageMenuBtn = $(doc.querySelector('.btn-menu'));

                        if($nextPageMenuBtn.hasClass('-brown')) {
                            $('.btn-menu').addClass('-brown')
                        } else {
                            $('.btn-menu').removeClass('-brown')
                        }
                        
                        setTimeout(() => {

                            self.initTiles();

                            self.refreshMenu();

                            gsap.set('.menu', {
                                zIndex: 3,
                                clearProps: 'all'
                            })
                            
                            gsap.set(self.currentTransition, { clearProps: "all" });
                        }, 700)

                        smoothScroll.destroy();

                        $('.btn-menu').removeClass('is-hidden');

                        setTimeout(()=>{
                            ev('transitionFinished', {});
                        }, 100)

                    }).catch(function (err) {
                        console.warn('Something went wrong.', err);
                    });
                }
            }, '0')

        heroTimeline.play();


        setTimeout(function() {
            window.changePage = false;
            document.body.dispatchEvent(new CustomEvent('page-change', { detail: this }));
        },3000)

        // GSDevTools.create({animation: heroTimeline})

        // gsap.to(tile, {
        //   'clipPath': `inset(0px 0px 0px 0 round 0px)`
        // })
    }

    in() {
        // gsap.from(hubHeaderChars.chars, animationSettings, '+=0.2');

        // gsap.from(hubArticles, {
        //     opacity: 0,
        //     y: 100,
        //     ease: "power4.out",
        //     duration: 1,
        //     stagger: 0.05
        // }, '-=1')
    }

    out() {

    }
}

export default function () {

    // const componentElement = document.querySelector('.menu');

    // if(componentElement) {
        let component = new Component({
            element: document
        });

        component.init();

        return component;
    // }
}
