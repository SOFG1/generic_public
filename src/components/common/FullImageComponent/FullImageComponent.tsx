import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { activityList } from "../../../config/userActivityList";
import {IAiImage} from "../../SentimentorComponents/AIPictureEditorComponent";
import {desktopBp} from "../../../styles/variables";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper";

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledImage = styled.img`
  max-width: 80vw;
  max-height: 80vh;
`;

interface IProps {
  imgUrls: IAiImage[]
  onClose: () => void;
  currentSlide: number | null;
  onSlide: (s: number) => void;
}

const FullImageComponent = React.memo(({ imgUrls,onSlide, currentSlide, onClose }: IProps) => {
  const [swiper, setSwiper] = useState<any>(null); //Swiper instance

  useEffect(() => {
    if (swiper && swiper.realIndex !== currentSlide) {
      swiper?.slideTo(currentSlide)
    }
  }, [swiper, currentSlide])
  return (
    <StyledWrapper data-action={activityList["rankings-AIpicture-resize"]}>
      <StyledSwiper>
        {imgUrls.length > 0 && (
            <Swiper
                touchEventsTarget={"wrapper"}
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
                {imgUrls.map((i) => {
                  return (
                      <SwiperSlide onClick = {onClose} key={i.id}>
                        <StyledImage
                            src={i.url || ""}
                        />
                      </SwiperSlide>
                  );
                })}
              </>
            </Swiper>
        )}

        {imgUrls.length === 0 && (
            <SwiperSlide>
              <StyledImage src={imgUrls[0].url} />
            </SwiperSlide>
        )}
      </StyledSwiper>
    </StyledWrapper>
  );
});

export default FullImageComponent;

const StyledSwiper = styled.div`
  width: 100%;
  height: 100%;
  .swiper {
   width: 100%;
    height: 100%;
  }
  .swiper-slide{
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  .swiper-button-prev::after,.swiper-button-next::after {
    width: 0.52vw;
    @media screen and (max-width: ${desktopBp}) {
      width: 7px;
    }
  }

`;
