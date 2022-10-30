import useSlider from "../../hooks/use-slider";
import {
  Slide,
  Image,
  Container,
  Wrapper,
  Dots,
  DotsContainer,
  SliderBtn,
  RelativeContainer,
} from "./style";

const Slider = ({ images }) => {
  const { slideIndex, nextSlide, prevSlide, moveDot } = useSlider(images.length);

  return (
    <RelativeContainer>
      <div>Hello</div>
      <SliderBtn left onClick={prevSlide}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.906 2.469a.368.368 0 0 0-.515 0L5.14 12.594a.368.368 0 0 0 0 .515l11.25 10.125c.14.141.375.141.515 0 .14-.14.14-.422 0-.515L5.938 12.875l10.968-9.89C17 2.937 17 2.843 17 2.702c0-.047 0-.14-.094-.234Z"
            fill="#000"
          ></path>
        </svg>
      </SliderBtn>

      <SliderBtn onClick={nextSlide}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.906 2.469a.368.368 0 0 0-.515 0L5.14 12.594a.368.368 0 0 0 0 .515l11.25 10.125c.14.141.375.141.515 0 .14-.14.14-.422 0-.515L5.938 12.875l10.968-9.89C17 2.937 17 2.843 17 2.702c0-.047 0-.14-.094-.234Z"
            fill="#000"
          ></path>
        </svg>
      </SliderBtn>

      {images.map((img, i) => (
        <Container key={img}>
          <Wrapper>
            <Slide active={slideIndex === i + 1}>
              <Image src={img} />
            </Slide>
          </Wrapper>
        </Container>
      ))}
      <DotsContainer>
        {Array.from({ length: images.length  }).map((_item, index) => (
          <Dots
            key={index}
            active={slideIndex === index + 1}
            onClick={() => moveDot(index + 1)}
          />
        ))}
      </DotsContainer>
    </RelativeContainer>
  );
};

export default Slider;
