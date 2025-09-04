"use client"

import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import type {LatLngExpression, LatLngTuple} from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
    posix: LatLngExpression | LatLngTuple;
    zoom: number;
}

const defaults = {
    zoom: 19,
}

const Map = (Map: MapProps) => {
    const {zoom = defaults.zoom, posix} = Map;
    return (

        <MapContainer
            className={"map-container"}
            center={posix}
            zoom={zoom}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={posix} draggable={false}>
                <Popup>This is the address!</Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map