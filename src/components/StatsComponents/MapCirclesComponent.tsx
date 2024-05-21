import React from "react";
import styled from "styled-components";
import { Marker } from "react-map-gl";

const circleColors = [
  "rgb(240,101,67)",
  "rgb(218, 188, 88)",
  "rgb(95, 218, 88)",
];

const StyledCircle = styled.span<{ color: string; size: number }>`
  display: inline-block;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border: 2px solid ${({ color }) => color};
  box-shadow: inset 0 0 10px ${({ color }) => color};
  border-radius: 50%;
`;

interface IProps {
  mapCircles: any[];
  onSelect: (c: any) => void;
}

const MapCirclesComponent = React.memo(({ mapCircles, onSelect }: IProps) => {
  return (
    <>
      {mapCircles.map((c, index) => {
        //Calculate color
        let color = circleColors[0];
        if (c.city_score > 0.3) color = circleColors[1];
        if (c.city_score > 0.6) color = circleColors[2];
        //Calculate size
        const size = c._size * 10 * 4;
        if (!c) return null;
        return (
          <Marker
            key={index}
            latitude={c.lat}
            longitude={c.lng}
            anchor="center"
            onClick={() => onSelect(c)}
          >
            <StyledCircle color={color} size={size} />
          </Marker>
        );
      })}
    </>
  );
});

export default MapCirclesComponent;
