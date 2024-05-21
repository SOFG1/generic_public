import React, { useMemo } from "react";
import pin_big_red from "../../assets/images/big_red.png";
import pin_big_yellow from "../../assets/images/big_yellow.png";
import pin_big_blue from "../../assets/images/big_blue.png";
import { Marker } from "react-map-gl";
import { convertElectionMapPoints } from "../../utils/convertElectionMapPoints";

interface IProps {
  points: any[];
  onSelect: (m: any) => void;
}

const MapMarkersComponent = React.memo(({ points, onSelect }: IProps) => {
  const markers = useMemo(() => {
    return convertElectionMapPoints(points);
  }, [points]);

  return (
    <>
      {markers?.redPoints?.map((m: any, index: number) => {
        return (
          <Marker
            onClick={() => onSelect(m)}
            latitude={m.lat}
            longitude={m.lng}
            anchor="center"
            key={index}
          >
            <img style={{ height: "19px", width: "13px" }} src={pin_big_red} />
          </Marker>
        );
      })}
      {markers?.yellowPoints?.map((m: any, index: number) => {
        return (
          <Marker
            onClick={() => onSelect(m)}
            latitude={m.lat}
            longitude={m.lng}
            anchor="center"
            key={index}
          >
            <img
              style={{ height: "19px", width: "13px" }}
              src={pin_big_yellow}
            />
          </Marker>
        );
      })}
      {markers?.bluePoints?.map((m: any, index: number) => {
        return (
          <Marker
            onClick={() => onSelect(m)}
            latitude={m.lat}
            longitude={m.lng}
            anchor="center"
            key={index}
          >
            <img style={{ height: "19px", width: "13px" }} src={pin_big_blue} />
          </Marker>
        );
      })}
    </>
  );
});

export default MapMarkersComponent;
