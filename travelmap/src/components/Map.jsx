import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvent,
    useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CityContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
export default function Map() {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([27.7103, 85]);
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();

    const [lat, lng] = useUrlPosition();

    useEffect(
        function () {
            if (lat && lng) setMapPosition([lat, lng]);
        },
        [lat, lng]
    );

    useEffect(
        function () {
            if (geolocationPosition)
                setMapPosition([
                    geolocationPosition.lat,
                    geolocationPosition.lng,
                ]);
        },
        [geolocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading...." : "Use Your Position"}
                </Button>
            )}
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: function (e) {
            const { lat, lng } = e.latlng;
            navigate(`form?lat=${lat}&lng=${lng}`);
        },
    });
    return null;
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}
