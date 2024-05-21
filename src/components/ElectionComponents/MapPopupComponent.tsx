import React from "react";
import { useTranslation } from "react-i18next";
import { Popup } from "react-map-gl";
import styled from "styled-components";

const ModalTitle = styled.p`
  font-weight: 700;
  font-size: 22px;
  line-height: 24px;
  margin-bottom: 10px;
  text-align: start;
  letter-spacing: 1px;
  margin-inline-end: 10px;
  @media screen and (max-width: 1150px) {
    margin: 0 0 15px;
    margin-inline-end: 10px;
  }
`;

const ModalBox = styled.div`
  min-width: 170px;
  gap: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-inline-end: 10px;
`;

const ModalKey = styled.p`
  text-align: left;
  font-weight: 400;
  line-height: 1.1;
  margin: 0 0 5px;
`;

const ModalValue = styled.p`
  text-align: right;
  font-weight: 600;
  line-height: 1.1;
  margin: 0 0 5px;
`;

interface IProps {
  selectedMarker: any;
  onClose: () => void;
}
 

const hiddenProperties = ["Expected model voters", "lng", "lat", "coordinates", "area_size", "area_color", "pin_color"]

const MapPopupComponent = React.memo(({ selectedMarker, onClose }: IProps) => {
  const { t } = useTranslation();

  console.log(selectedMarker)

  if (!selectedMarker) return null;
  return (
    <Popup
      longitude={selectedMarker.lng}
      latitude={selectedMarker.lat}
      onClose={onClose}
      anchor="bottom"
      closeOnClick={false}
      closeOnMove={true}
    >
      <>
        <ModalTitle>
          {selectedMarker[Object.keys(selectedMarker)[0]]}
        </ModalTitle>
        <div>
          {Object.keys(selectedMarker).map((key: any, index: number) => {
            if (index === 0) return;
            if (hiddenProperties.includes(key)) return
            console.log(key)
            return (
              <ModalBox key={index}>
                <ModalKey>{t(key, key)}</ModalKey>
                <ModalValue>{selectedMarker[key]}</ModalValue>
              </ModalBox>
            );
          })}
        </div>
      </>
    </Popup>
  );
});

export default MapPopupComponent;
