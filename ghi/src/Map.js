import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility";

import L from "leaflet";
import "leaflet-defaulticon-compatibility";

// Rest of your code...

export default function Map({ weatherData }) {
  const position = [weatherData.coord.lat, weatherData.coord.lon];
  const markerText = `Weather at item location: ${weatherData.weather[0].main}, Temperature: ${weatherData.main.temp} °F`;

  return (
    <div className="map-container">
      <MapContainer
        className="map"
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{markerText}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
