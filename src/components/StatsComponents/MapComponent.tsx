import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { colors } from "../../styles/colors";
import { desktopBp } from "../../styles/variables";
import { useSMStatsActions, useSMStatsState } from "../../store/smStats";
import { useUserState } from "../../store/user";
import { convertStatsMapPoints } from "../../utils/convertStatsMapPoints";
import { getStatsMapMeanCoords } from "../../utils/getStatsMapMeanCoords";
import { convertStatsMapLevel } from "../../utils/convertStatsMapLevel";
import MapPopupComponent from "./MapPopupComponent";
import MapMarkersComponent from "./MapMarkersComponent";
import MapCirclesComponent from "./MapCirclesComponent";
import { createPortal } from "react-dom";
import { activityList } from "../../config/userActivityList";
import { Modal } from "../../UI/Modal";
import { ImportMapData } from "../../views/StatsViews";
import { CloudIcon } from "../../UI/Svg";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledWrapper = styled.div`
flex-grow: 1;
  .mapboxgl-map {
    width: 26.04vw;
    min-height: 25.21vw;
    height: 100%;
    border-radius: 15px;
    flex: 1;
  }

  & .mapboxgl-popup-content {
    position: relative;
    padding: 0.31vw 0.52vw 0.52vw;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    border-radius: 0.52vw;
    border: 2px solid ${colors.orange};
    min-width: 130px;
  }

  & .mapboxgl-popup-tip {
    display: none;
  }

  @media screen and (max-width: ${desktopBp}) {
    .mapboxgl-map {
      min-height: 327px;
    }
  }
`;

const UploadBtn = styled.button`
svg {
  height: 70%;
  width: 70%;
  margin: auto;
}
`

const MapComponent = React.memo(() => {
  const { userInfo } = useUserState();
  const { mapPoints, mapLevel } = useSMStatsState();
  const { onGetMapPoints, onGetMapLevel } = useSMStatsActions();
  const [map, setMap] = useState<any>(null)
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [levelModal, setLevelModal] = useState<any | null>(null);






  //Mean coords (map center) [lng, lat]
  const meanCoords: [number, number] = useMemo(() => {
    return getStatsMapMeanCoords(mapPoints, mapLevel, userInfo);
  }, [mapPoints, mapLevel, userInfo]);


  const mapMarkers = useMemo(() => {
    return convertStatsMapPoints(mapPoints);
  }, [mapPoints]);

  const mapCircles = useMemo(() => {
    return convertStatsMapLevel(mapLevel);
  }, [mapLevel]);


  const buttonsContainer = useMemo(() => {
    return document.querySelector(".mapboxgl-ctrl")
  }, [map])

  useEffect(() => {
    onGetMapPoints();
    onGetMapLevel();
  }, []);

  useEffect(() => {
    if (!isNaN(meanCoords[0]) && !isNaN(meanCoords[1]) && map) {
      map.setCenter({ lng: meanCoords[0], lat: meanCoords[1] })
      map.setZoom(9)
    }
  }, [meanCoords, map]);

  return (
    <>
      <Modal show={showImportModal} onClose={() => setShowImportModal(false)}>
        <ImportMapData onClose={() => setShowImportModal(false)} />
      </Modal>
      <StyledWrapper>

        <ReactMapGL
          onLoad={(e) => setMap(e.target)}
          mapboxAccessToken="pk.eyJ1Ijoib25lcGVhY2UiLCJhIjoiY2t1eHUxMmpiMGhxaTJucXFjd2k5ZjE2OSJ9.MwH_NiqfqOlyMU3j50Z1dw"
          mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        >
          <MapPopupComponent
            selectedCircle={levelModal}
            onClose={() => setLevelModal(null)}
          />
          <NavigationControl />
          {buttonsContainer && createPortal(<UploadBtn
            onClick={() => setShowImportModal(true)} data-action={activityList["open-map-upload"]}
          ><CloudIcon /></UploadBtn>, buttonsContainer)}
          <MapCirclesComponent
            mapCircles={mapCircles}
            onSelect={(c) => setLevelModal(c)}
          />
          <MapMarkersComponent mapMarkers={mapMarkers} />
        </ReactMapGL>
      </StyledWrapper>
    </>
  );
});

export default withErrorBoundaryHOC(MapComponent);
