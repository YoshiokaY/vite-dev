import Splide from "@splidejs/splide";

function flexSlide(target: string, delay: number = 4000, list: number = 4, pager: boolean = true, auto: boolean = true, loop: boolean = false, target2?: string) {
  const slideElement = document.querySelectorAll(target);
  const elementArr = Array.prototype.slice.call(slideElement);
  if (slideElement.length > 0) {
    elementArr.forEach((element) => {
      const item = element.querySelectorAll(".splide__slide").length;
      const slide = new Splide(element, {
        arrows: false,
        pagination: pager,
        speed: 1,
        autoplay: auto,
        rewind: loop === true ? true : false,
        interval: delay,
        pauseOnFocus: true,
        pauseOnHover: true,
        type: "fade",
        isNavigation: target2 ? true : false,
      });
      if (target2) {
        const slide2 = new Splide(target2, {
          arrows: false,
          pagination: false,
          speed: 10,
          rewind: false,
          type: "slide",
          perPage: item < list ? item : list,
          isNavigation: target ? true : false,
          perMove: 1,
          gap: "1.6rem",
        });
        slide.mount();
        slide2.sync(slide);
        slide2.mount();
      }
    });
  }
}

flexSlide(".mv_slide_main", 4000, 4, false, false, false, ".mv_slide_thumb");
