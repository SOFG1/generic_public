import React from "react";
import styled from "styled-components";
import { Popup } from "react-map-gl";
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { colors } from "../../styles/colors";

const ModalTitle = styled.p`
  font-weight: 700;
  font-size: 0.73vw;
  line-height: 0.89vw;
  text-align: center;
  letter-spacing: 1px;
  color: ${colors.graphite_6};
  margin: 0 0 5px;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 9px;
    line-height: 11px;
  }
`;

const ModalKey = styled(ModalTitle)`
  text-align: left;
  font-weight: 400;
`;

const ModalValue = styled(ModalTitle)`
  text-align: left;
`;

interface IProps {
  selectedCircle: any;
  onClose: () => void;
}

const MapPopupComponent = React.memo(({ selectedCircle, onClose }: IProps) => {
  const { t } = useTranslation();

  if (!selectedCircle) return null;

  return (
    <Popup
      closeOnClick={false}
      closeOnMove={true}
      longitude={selectedCircle.lng}
      latitude={selectedCircle.lat}
      anchor="bottom"
      onClose={onClose}
    >
      <>
        <ModalTitle>{selectedCircle?.city}</ModalTitle>
        {Object.keys(selectedCircle)?.map((key: string, index: number) => {
          if (key === "coordinates") return null;
          if (key === "lat") return null;
          if (key === "lng") return null;
          if (key === "_size") return null;
          return (
            <React.Fragment key={index}>
              <ModalKey>{t(`map-${key}`)}</ModalKey>
              <ModalValue>{selectedCircle[key]}</ModalValue>
            </React.Fragment>
          );
        })}
      </>
    </Popup>
  );
});

export default MapPopupComponent;
