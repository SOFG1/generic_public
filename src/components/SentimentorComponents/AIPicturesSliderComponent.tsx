import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { FullImageComponent } from "../common/FullImageComponent";
import picPlaceholder from "../../assets/images/picture-placeholder.jpg";
import { desktopBp } from "../../styles/variables";
import {IAiImage} from "./AIPictureEditorComponent";

const StyledSwiper = styled.div`
  width: 100%;
  height: 100%;
  .swiper {
   width: 100%;
    height: 100%;
  }
  .swiper-button-prev::after,.swiper-button-next::after {
    width: 0.52vw;
    @media screen and (max-width: ${desktopBp}) {
      width: 7px;
    }
  }

`;

const StyledPicture = styled.img`
  background-image: url(${picPlaceholder});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  object-fit: contain;
  height: 100%;
  width: 100%;
`;

interface IProps {
  images: IAiImage[];
  currentSlide: number | null;
  onSlide: (s: number) => void;
}

const AIPicturesSliderComponent = React.memo(
  ({ images, currentSlide, onSlide }: IProps) => {
    const [swiper, setSwiper] = useState<any>(null); //Swiper instance
    const [openedImg, setOpenedImg] = useState<string | null>(null);

    useEffect(() => {
      if (swiper && swiper.realIndex !== currentSlide) {
        swiper?.slideTo(currentSlide)
      }
    }, [swiper, currentSlide])

    return (
      <StyledSwiper>
        {images.length > 0 && (
          <Swiper
            onRealIndexChange={(s) => onSlide(s.realIndex)}
            onSwiper={(swiper) => setSwiper(swiper)}
            spaceBetween={50}
            slidesPerView={1}
            modules={[Navigation]}
            centeredSlides={true}
            navigation={true}
            pagination={true}
          >
            <>
              {images.map((i) => {
                return (
                  <SwiperSlide key={i.id}>
                    <StyledPicture
                      src={i.url || ""}
                      onClick={() => setOpenedImg(i.url)}
                    />
                  </SwiperSlide>
                );
              })}
            </>
          </Swiper>
        )}

        {images.length === 0 && (
          <SwiperSlide>
            <StyledPicture src={""} />
          </SwiperSlide>
        )}
        {openedImg && (
          <FullImageComponent
              onSlide={onSlide}
            currentSlide={currentSlide}
            imgUrls={images}
            onClose={() => setOpenedImg(null)}
          />
        )}
      </StyledSwiper>
    );
  }
);

export default AIPicturesSliderComponent;
