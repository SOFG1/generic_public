import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { Card } from "../../components/common/Card";
import {
  MapHeadingComponent,
  MapMarkersComponent,
  MapPopupComponent,
} from "../../components/ElectionComponents";
import { desktopBp } from "../../styles/variables";
import { colors } from "../../styles/colors";
import { useUserState } from "../../store/user";
import { useElectionActions, useElectionState } from "../../store/election";
import { IMapPoint } from "../../store/election/types";
import { getElectionMeanCoords } from "../../utils/getElectionMeanCoords";
import { demoElectionMapLevel, demoUsers } from "../../config/demoUsers";
import MapCirclesComponent from "../../components/StatsComponents/MapCirclesComponent";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledCard = styled(Card)`
  margin-bottom: 1.56vw;

  .mapboxgl-map {
    min-height: 33.85vw;
    width: 100%;
    border-radius: 15px;
  }

  .mapboxgl-popup-content {
    position: relative;
    padding: 6px 10px 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 2px solid ${colors.orange};
    min-width: 130px;
    > div {
      max-width: 300px;
      max-height: 200px;
      overflow-y: auto;
    }
  }

  & .mapboxgl-popup-tip {
    display: none;
  }

  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;

    .mapboxgl-map {
      min-height: 425px;
    }
  }

  @media screen and (max-width: 1150px) {
    .mapboxgl-map {
      min-height: 450px;
      width: 100%;
    }
    .mapboxgl-popup-content > div {
      max-width: 250px;
      max-height: 150px;
    }
  }
`;


const MapView = React.memo(() => {
  const { userInfo } = useUserState();
  const { mapPoints } = useElectionState();
  const { onGetMap } = useElectionActions();
  const [map, setMap] = useState<any>(null)
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);

  const notEmptyPoints = useMemo(() => {
    return mapPoints
      .filter((point: IMapPoint) => point["Total Eligible Voters"] > 0)
      .filter((point: IMapPoint) => point.lng !== null && point.lat !== null)
      .map((point) => ({
        ...point,
        size: point.area_size * 1000,
        color: point.area_color,
        coordinates: [point.lng, point.lat],
      }));
  }, [mapPoints]);


  //Map Circles only for demo users
  const mapLevel = useMemo(() => {
    if (demoUsers.includes(userInfo?.login as string)) return demoElectionMapLevel
    return []
  }, [userInfo?.login])

  const meanCoords = useMemo(() => {
    return getElectionMeanCoords(notEmptyPoints, userInfo);
  }, [notEmptyPoints]);

  useEffect(() => {
    if (!isNaN(meanCoords[0]) && !isNaN(meanCoords[1]) && map) {
      map.setCenter({ lng: meanCoords[0], lat: meanCoords[1] })
      map.setZoom(9)
    }
  }, [meanCoords, map]);

  useEffect(() => {
    onGetMap();
  }, []);

  return (
    <StyledCard>
      <MapHeadingComponent />
      <ReactMapGL
        onLoad={(e) => setMap(e.target)}
        mapboxAccessToken="pk.eyJ1Ijoib25lcGVhY2UiLCJhIjoiY2t1eHUxMmpiMGhxaTJucXFjd2k5ZjE2OSJ9.MwH_NiqfqOlyMU3j50Z1dw"
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      >
        <NavigationControl />
        <MapPopupComponent
          selectedMarker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
        />
        <MapCirclesComponent
          mapCircles={mapLevel}
          onSelect={(c) => {}}
        />
        <MapMarkersComponent points={notEmptyPoints} onSelect={setSelectedMarker} />
      </ReactMapGL>
    </StyledCard>
  );
});

export default withErrorBoundaryHOC(MapView);
