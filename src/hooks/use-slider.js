import { useState } from "react";

const useSlider = (length) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const nextSlide = () => {
    console.log('indexnext--> ', slideIndex)

    if (slideIndex !== length) {
      setSlideIndex(slideIndex + 1);
      return
    } else if (slideIndex === length) {
      setSlideIndex(1);
      return
    }
  };

  const prevSlide = () => {
    console.log('indexpre--> ', slideIndex)
    if (slideIndex ===  1) {
      setSlideIndex(length);
      return
    }
    else if (slideIndex !== 1) {
      console.log('123123');
      setSlideIndex(slideIndex - 1);
    } 
  };

  const moveDot = (i) => setSlideIndex(i);

  return { slideIndex, nextSlide, prevSlide, moveDot };
};

export default useSlider;
