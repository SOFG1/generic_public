import mapboxgl from "mapbox-gl"; 
import "mapbox-gl/dist/mapbox-gl.css";

// @ts-ignore
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
