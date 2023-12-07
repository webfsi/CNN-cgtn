import heroTransition from "./heroTransition";
import initHero from "./hero";
import initPart1 from "./part-1";
import horizontal from "./horizontal";
import cta from "./cta";
import listImageScale from "./listImageScale";
import pan from "./pan";
import lightbox from "./lightbox";
import preloader from "./preloader";
import initSplitter from "./splitter";
import hub from "./hub";
import menu from "./menu";
import smoothScroll from "./smoothScroll";
import pictureFull from "./picture-full";
import circleScale from "./circle-scale";
import vertical from "./vertical";
import pan2 from "./pan-2";
import imageScaleDown from "./imageScaleDown";
import video from "./video";
import magneticButton from './magnetic-button';
import sliderLong from "./slider-long";
import CursorMover from "./cursor-pointer";

import initCnnBar from './cnnBar';

function manualLazy() {
    $('[data-component="lazyload-manual"]').each(function() {
        $(this).attr('src', $(this).data('src'));
    })
}

export default () => {
    smoothScroll();
    preloader();
    hub();
    initHero();
    heroTransition();
    
    lightbox();
    const menuInstance = menu();
    initCnnBar();

    function initPageAnimations() {
        initSplitter();
        initPart1();
        listImageScale();
        imageScaleDown();
        pan();
        horizontal();
        cta();
        pictureFull();
        vertical();
        circleScale();
        pan2();
        manualLazy();
        video();
        magneticButton();
        sliderLong();
        const cursorInstance = new CursorMover("[data-dragger]");

    }

    document.addEventListener("preloaderDone", () => {
        initPageAnimations();
        
        lscroll.update();
    }, { once: true });

    document.addEventListener("transitionFinished", () => {
        heroTransition();

        initPageAnimations();

        menuInstance.initWhiteArea();
        setTimeout(() => {
            // console.log(document.querySelector('[data-scroll-container]').offsetHeight);
            window.dispatchEvent(new Event('resize'));
            
            window.lazyInstance.update();
            
            ev('initialize', {});
        }, 0)
    }, { once: false });

    $('body').on('click', '.image-switch_action', function() {
        const $imageOne = $(this).parent().find('.image-switch_1');
        const $imageTwo = $(this).parent().find('.image-switch_2');

        $(this).parent().toggleClass('show-second')
    })
}