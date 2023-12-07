import Swiper from "swiper/swiper-bundle";

export default () => {
  const sliderContainer = document.querySelector("[data-slider-long-img]");
  if (!sliderContainer) return;
  const slider = sliderContainer.querySelector(".swiper");
  const sliderNavPrev = sliderContainer.querySelector(".swiper-button-prev");
  const sliderNavNext = sliderContainer.querySelector(".swiper-button-next");
  const sliderLong = new Swiper(slider, {
    slidesPerView: 2,
    spaceBetween: 0,
    // loop: true,
    speed: 1000,
    rtl: true,
    // autoplay: {
    // 	delay: 5000,
    // },
    navigation: {
      nextEl: sliderNavNext,
      prevEl: sliderNavPrev,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1.2,
      },
      1440: {
        slidesPerView: 1,
      },
      1900: {
        slidesPerView: 2,
      },
      2300: {
        slidesPerView: 2.5,
      },
    },
    // pagination: {
    // 	el: '.js-slider-long__pagination',
    // 	type: 'bullets',
    // 	clickable: true,
    // },
  });
};
