import Map, {
  MapLayerMouseEvent,
  PointLike,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ACCESS_TOKEN } from "../private/api.js";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import { Box } from "@mui/material";
import { GeoLoc } from "../types/types.js";

//Interface for the WrappedMap class
interface WrappedMapProps {
  setCurrentLocation: Dispatch<SetStateAction<GeoLoc | undefined>>;
}

//Returns the map to be displayed in REPL
export function WrappedMap(props: WrappedMapProps) {
  //Initializing the constants that are needed throughout
  const initialZoom = 16;
  const ProvidenceLatLong = {
    lat: 41.8262,
    long: -71.4033,
  };
  const [viewState, setViewState] = useState({
    longitude: ProvidenceLatLong.long,
    latitude: ProvidenceLatLong.lat,
    zoom: initialZoom,
  });

  function onMapClick(e: MapLayerMouseEvent) {
    console.log(e);

    props.setCurrentLocation({ lat: e.lngLat.lat, lon: e.lngLat.lng });
  }
  // need to put the map in a box or something
  return (
    <div>
      <Map
        mapboxAccessToken={ACCESS_TOKEN}
        {...viewState}
        onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
        style={{
          height: "50vh",
          width: "50vw",
        }} //{ width: window.innerWidth, height: window.innerHeight }
        mapStyle={"mapbox://styles/mapbox/streets-v12"}
        onClick={onMapClick}
      ></Map>
    </div>
  );
}
