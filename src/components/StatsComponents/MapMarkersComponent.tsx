import React from "react"
import { Marker } from "react-map-gl";
import smallRedMarker from "../../assets/images/small_red.png";
import smallYellowMarker from "../../assets/images/small_yellow.png";
import smallBlueMarker from "../../assets/images/small_blue.png";
import bigRedMarker from "../../assets/images/big_red.png";
import bigYellowMarker from "../../assets/images/big_yellow.png";
import bigBlueMarker from "../../assets/images/big_blue.png";


interface IProps {
    mapMarkers: any
}

const MapMarkersComponent = React.memo(({mapMarkers}: IProps) => {
    return <>
      {mapMarkers?.smallRed?.map((m: any, index: number) => {
          return (
            <Marker latitude={m.lat} longitude={m.lng} anchor="center" key={index}>
              <img
                style={{ height: "16px", width: "11px" }}
                src={smallRedMarker}
              />
            </Marker>
          );
        })}
        {mapMarkers?.bigRed?.map((m: any, index: number) => {
          return (
            <Marker latitude={m.lat} longitude={m.lng} anchor="center" key={index}>
              <img
                style={{ height: "19px", width: "13px" }}
                src={bigRedMarker}
              />
            </Marker>
          );
        })}
        {mapMarkers?.smallYellow?.map((m: any, index: number) => {
          return (
            <Marker latitude={m.lat} longitude={m.lng} anchor="center" key={index}>
              <img
                style={{ height: "16px", width: "11px" }}
                src={smallYellowMarker}
              />
            </Marker>
          );
        })}
        {mapMarkers?.bigYellow?.map((m: any, index: number) => {
          return (
            <Marker latitude={m.lat} longitude={m.lng} anchor="center" key={index}>
              <img
                style={{ height: "16px", width: "11px" }}
                src={bigYellowMarker}
              />
            </Marker>
          );
        })}
        {mapMarkers?.smallBlue?.map((m: any, index: number) => {
          return (
            <Marker latitude={m.lat} longitude={m.lng} anchor="center" key={index}>
              <img
                style={{ height: "16px", width: "11px" }}
                src={smallBlueMarker}
              />
            </Marker>
          );
        })}
        {mapMarkers?.bigBlue?.map((m: any, index: number) => {
          return (
            <Marker latitude={m.lat} longitude={m.lng} anchor="center" key={index}>
              <img
                style={{ height: "16px", width: "11px" }}
                src={bigBlueMarker}
              />
            </Marker>
          );
        })}
    </>
})

export default MapMarkersComponent