import nextSide from './assets/nextSide.svg';
import previousSide from './assets/previousSide.svg';

import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import useSlider from "./hooks/use-slider";
import {
  Container,
  Wrapper,
  Text,
  Slide,
  SliderBtn,
  MobileCard,
  ImageCard,
  ImgPlayButton,
  WrapPlayer,
  WrapControl,
  ButtonVolumeMobile,
  TextSelect,
  ContainerSelect,
  ContainerCloseButton,
  ContainerButton,
  ContainerCloseButtonMobile,
  TextMobile, ContainerModal, ContainerInnerModal
} from "./style/custom-styles";
import { CustomButton, CustomSelectbox, Slider } from "./components";

import productJson from "./product.json";
import PlayerControl from "./components/playerControl/PlayerControl";

import Cart from './components/Cart/Cart'
import './components/Cart/style.css'

function App() {
  const videoRef = useRef();
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);
  const [indexVideo, setIndexVideo] = useState(1)
  const [play, setPlay] = useState(true)
  const [volume, setVolume] = useState(false)
  const [progress, setProgress] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const { slideIndex, nextSlide, prevSlide } = useSlider(productJson?.length);
  const onLoadedData = () => setIsVideoLoaded(true);

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  const [blockStatus, setBlockStatus] = useState(false);
  const handleAddtoCart = () => {
    setBlockStatus(!blockStatus);
  }

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe || isRightSwipe) {
      isLeftSwipe ? nextSlide() : nextSlide();
    }
  }

  const onClickRestart = () => {
    let video = videoRef.current.getInternalPlayer();
    console.log("videoRef.current.getCurrentTime()", videoRef.current.getCurrentTime());
    video.currentTime = 0;
    console.log("videoRef.current.getCurrentTime()", videoRef.current.getDuration());
    video.play();
  }

  useEffect(() => {
    setIndexVideo(slideIndex)
  }, [slideIndex])

  return (
    <>
      {window?.innerWidth > 900 ?
        <>
          <SliderBtn up onClick={prevSlide}>
            <img src={previousSide} style={{ color: 'white', width: '20px', height: '20px', transform: 'rotate(90deg)' }} alt='img' />
          </SliderBtn>

          <SliderBtn onClick={nextSlide}>
            <img src={nextSide} style={{ color: 'white', width: '20px', height: '20px', transform: 'rotate(-90deg)' }} alt='img' />
          </SliderBtn>
        </>
        : null
      }
      {productJson.map((product, i) => (
        <Slide active={slideIndex === i + 1} key={product.name} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          {isVideoLoaded && (
            <WrapControl>
              <WrapPlayer onClick={() => setPlay(!play)}>
                {window?.innerWidth > 500
                  ? null
                  : <ContainerCloseButtonMobile>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.055 16.594a.662.662 0 0 1-.899 0L10 11.398l-5.195 5.196a.662.662 0 0 1-.899 0 .662.662 0 0 1 0-.899L9.102 10.5 3.906 5.344a.662.662 0 0 1 0-.899.662.662 0 0 1 .899 0L10 9.641l5.156-5.196a.662.662 0 0 1 .899 0 .662.662 0 0 1 0 .899L10.859 10.5l5.196 5.195a.662.662 0 0 1 0 .899Z" fill="#1C1D21"></path></svg>
                  </ContainerCloseButtonMobile>}
                {play === false && <ImgPlayButton src={'https://cdn-icons-png.flaticon.com/512/0/375.png'} alt="" ><svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M60 114.546c30.125 0 54.546-24.421 54.546-54.546S90.125 5.455 60 5.455 5.455 29.875 5.455 60 29.875 114.546 60 114.546Z" fill="#000" fill-opacity="0%"></path><path d="M60 5.455a54.546 54.546 0 0 1 47.236 27.272" stroke="url(#player-button-s)" stroke-width="5.986"></path><path d="M107.236 32.727a54.54 54.54 0 0 1 0 54.546" stroke="url(#player-button-b)" stroke-width="5.986"></path><path d="M107.236 87.273A54.548 54.548 0 0 1 60 114.546" stroke="url(#player-button-c)" stroke-width="5.986"></path><path d="M60 114.546a54.55 54.55 0 0 1-47.236-27.273" stroke="url(#player-button-d)" stroke-width="5.986"></path><path d="M12.764 87.273a54.545 54.545 0 0 1 0-54.545" stroke="url(#player-button-e)" stroke-width="5.986"></path><path d="M12.764 32.727A54.546 54.546 0 0 1 60 5.455" stroke="url(#player-button-f)" stroke-width="5.986"></path><path d="M50.387 85.167c-3.142 0-5.387-2.47-5.387-5.387V40.275C45 37.469 47.245 35 50.387 35c.898 0 1.908.224 2.806.786l32.322 19.752c1.571.898 2.581 2.694 2.581 4.49 0 1.907-1.01 3.703-2.581 4.6L53.193 84.382a5.33 5.33 0 0 1-2.806.786Z" fill="#fff"></path><defs><linearGradient id="player-button-s" x1="60" y1="5.455" x2="83.619" y2="46.363" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"></stop><stop offset="0.5" stop-color="#ffffff"></stop></linearGradient><linearGradient id="player-button-b" x1="107.236" y1="32.727" x2="107.236" y2="87.273" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"></stop><stop offset="0.7" stop-color="#ffffff"></stop></linearGradient><linearGradient id="player-button-c" x1="107.236" y1="87.273" x2="83.617" y2="128.181" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"></stop><stop offset="1" stop-color="#ffffff"></stop></linearGradient><linearGradient id="player-button-d" x1="60" y1="114.546" x2="36.381" y2="73.637" gradientUnits="userSpaceOnUse"><stop offset="0.2" stop-color="#ffffff"></stop><stop offset="1" stop-color="#ffffff"></stop></linearGradient><linearGradient id="player-button-e" x1="5.456" y1="87.273" x2="5.456" y2="32.727" gradientUnits="userSpaceOnUse"><stop offset="0.1" stop-color="#ffffff"></stop><stop offset="1" stop-color="#ffffff"></stop></linearGradient><linearGradient id="player-button-f" x1="12.764" y1="32.727" x2="36.383" y2="-8.181" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"></stop><stop offset="1" stop-color="#ffffff"></stop></linearGradient></defs></svg></ImgPlayButton>}
                <ReactPlayer
                  ref={videoRef}
                  className="react-player"
                  url={productJson[indexVideo - 1]?.video}
                  playing={play}
                  loop={true}
                  muted={volume}
                  onReady={onLoadedData}
                  pip={true}
                  onProgress={(progress) => {
                    setProgress(progress);
                  }}
                  playsinline={true}
                />
              </WrapPlayer>

              <PlayerControl setVolume={setVolume} volume={volume} progress={progress} onClickRestart={onClickRestart} />
            </WrapControl>
          )}
          <Wrapper show>
            <Container col justify>
              <ContainerCloseButton>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.055 16.594a.662.662 0 0 1-.899 0L10 11.398l-5.195 5.196a.662.662 0 0 1-.899 0 .662.662 0 0 1 0-.899L9.102 10.5 3.906 5.344a.662.662 0 0 1 0-.899.662.662 0 0 1 .899 0L10 9.641l5.156-5.196a.662.662 0 0 1 .899 0 .662.662 0 0 1 0 .899L10.859 10.5l5.196 5.195a.662.662 0 0 1 0 .899Z" fill="#1C1D21"></path></svg>
              </ContainerCloseButton>
              <Slider images={product.images} />
              <Container col items margin>
                <Text>{product.name}</Text>
                <Text bigger margin>{product.price}</Text>
              </Container>
              <ContainerSelect>
                <TextSelect>colour</TextSelect>
                <CustomSelectbox disabled name={'colour'}>
                  <option value="" hidden>
                    {product.color}
                  </option>
                </CustomSelectbox>
              </ContainerSelect>
              <ContainerSelect>
                <TextSelect>size</TextSelect>
                <CustomSelectbox>
                  <option value="" hidden style={{}}>
                    Select one size
                  </option>
                  {product.sizes.map((size) => (
                    <option value={size} key={size}>
                      {size}
                    </option>
                  ))}
                </CustomSelectbox>
              </ContainerSelect>
              <ContainerButton>
                <CustomButton title="Add to cart123" primary onClick={handleAddtoCart} />
                <CustomButton title="Product details" />
              </ContainerButton>
            </Container>
          </Wrapper>
          <ButtonVolumeMobile onClick={() => setVolume(!volume)}>
            {volume
              ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.758 3.36a1.265 1.265 0 0 0-1.367.235L6.117 8.283H2.875A1.85 1.85 0 0 0 1 10.158v3.75c0 1.015.82 1.875 1.875 1.875h3.242l5.274 4.648c.234.235.546.313.859.313.156 0 .313 0 .508-.078a1.31 1.31 0 0 0 .742-1.172V4.533a1.31 1.31 0 0 0-.742-1.172Zm8.281 8.634 1.836-1.836a.855.855 0 0 0 0-1.29.856.856 0 0 0-1.29 0l-1.835 1.837-1.875-1.836a.856.856 0 0 0-1.29 0 .855.855 0 0 0 0 1.289l1.837 1.836-1.836 1.875a.856.856 0 0 0 0 1.289c.352.39.937.39 1.289 0l1.875-1.836 1.836 1.836c.352.39.937.39 1.289 0a.856.856 0 0 0 0-1.29l-1.836-1.874Z" fill="#fff"></path></svg>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.094 9.103c-.39-.312-.977-.234-1.328.156a.942.942 0 0 0 .156 1.328c.43.352.703.86.703 1.446 0 .547-.273 1.055-.703 1.406a.942.942 0 0 0-.156 1.328.962.962 0 0 0 .742.352c.195 0 .43-.078.586-.196.898-.742 1.406-1.796 1.406-2.89 0-1.133-.508-2.188-1.406-2.93Zm2.383-2.852a.93.93 0 0 0-1.329.118c-.351.39-.273.976.118 1.328a5.555 5.555 0 0 1 2.109 4.336c0 1.64-.781 3.242-2.11 4.297-.39.351-.468.937-.117 1.328.196.234.43.351.704.351.234 0 .43-.078.625-.195 1.757-1.445 2.773-3.555 2.773-5.781a7.371 7.371 0 0 0-2.773-5.782Zm-6.72-2.89a1.265 1.265 0 0 0-1.366.234L6.117 8.283H2.875A1.85 1.85 0 0 0 1 10.158v3.75c0 1.015.82 1.875 1.875 1.875h3.242l5.274 4.648c.234.235.546.313.859.313.156 0 .313 0 .508-.078a1.31 1.31 0 0 0 .742-1.172V4.533a1.31 1.31 0 0 0-.742-1.172Z" fill="#fff"></path></svg>}
          </ButtonVolumeMobile>
          <MobileCard onClick={() => setModalVisible(true)}>
            <ImageCard src={product.images[0]} alt="" />
            <Container col items>
              <Container padding col items>
                <TextMobile primary>{product.name}</TextMobile>
                <TextMobile bold primary>
                  {product.price}
                </TextMobile>
                <CustomButton title="Shop" primary width />
              </Container>
            </Container>
          </MobileCard>
          {modalVisible
            ? <ContainerModal>
              <ContainerInnerModal col justify>
                <ContainerCloseButton modal onClick={() => setModalVisible(false)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.055 16.594a.662.662 0 0 1-.899 0L10 11.398l-5.195 5.196a.662.662 0 0 1-.899 0 .662.662 0 0 1 0-.899L9.102 10.5 3.906 5.344a.662.662 0 0 1 0-.899.662.662 0 0 1 .899 0L10 9.641l5.156-5.196a.662.662 0 0 1 .899 0 .662.662 0 0 1 0 .899L10.859 10.5l5.196 5.195a.662.662 0 0 1 0 .899Z" fill="#1C1D21"></path></svg>
                </ContainerCloseButton>
                <Slider images={product.images} />
                <Container col items margin>
                  <Text>{product.name}</Text>
                  <Text bigger margin>{product.price}</Text>
                </Container>
                <ContainerSelect>
                  <TextSelect>colour</TextSelect>
                  <CustomSelectbox disabled name={'colour'}>
                    <option value="" hidden>
                      {product.color}
                    </option>
                  </CustomSelectbox>
                </ContainerSelect>
                <ContainerSelect>
                  <TextSelect>size</TextSelect>
                  <CustomSelectbox>
                    <option value="" hidden style={{}}>
                      Select one size
                    </option>
                    {product.sizes.map((size) => (
                      <option value={size} key={size}>
                        {size}
                      </option>
                    ))}
                  </CustomSelectbox>
                </ContainerSelect>
                <ContainerButton>
                  <CustomButton title="Add to cart" primary />
                  <CustomButton title="Product details" />
                </ContainerButton>
              </ContainerInnerModal>
            </ContainerModal>
            : ''}
        </Slide>
      ))}
      {blockStatus === true && (
        <div className='cartContainer'>
          <Cart />
        </div>
      )}

    </>
  );
}

export default App;
