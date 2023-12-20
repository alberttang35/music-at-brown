import Map, {
  MapLayerMouseEvent,
  PointLike,
  Source,
  ViewStateChangeEvent,
  MapRef,
  Popup
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
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

//Interface for the WrappedMap class
interface WrappedMapProps {
  // setCurrentLocation: Dispatch<SetStateAction<GeoLoc | undefined>>;
  handleLocation: (num1: number, num2: number) => void;
}


 
//Returns the map to be displayed in REPL
export function WrappedMap(props: WrappedMapProps) {

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

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

  const [popupInfo, setPopupInfo] = useState<{
    latitude: number;
    longitude: number;
    isVisible: boolean;
  } | null>(null);

  const mapRef = useRef<MapRef>(null)

  function onMapClick(e: MapLayerMouseEvent) {
    setLatitude(e.lngLat.lat);
    setLongitude(e.lngLat.lng);
    
    setPopupInfo({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
      isVisible: true
    });
    props.handleLocation(e.lngLat.lat, e.lngLat.lng);
    
    console.log(e.lngLat);

  }
  
  // need to put the map in a box or something
  return (
    <Map
      mapboxAccessToken={ACCESS_TOKEN}
      {...viewState}
      onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
      style={{
        height: "75vh",
        width: "30vw",
      }} //{ width: window.innerWidth, height: window.innerHeight }
      mapStyle={"mapbox://styles/mapbox/streets-v12"}
      onClick={onMapClick}
    >
    {popupInfo && popupInfo.isVisible && (
          <Popup
            latitude={popupInfo.latitude}
            longitude={popupInfo.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            anchor="top"
          >
            <div>
              <p>Latitude: {popupInfo.latitude}</p>
              <p>Longitude: {popupInfo.longitude}</p>
            </div>
          </Popup>
        )}

    </Map>
  );
}
