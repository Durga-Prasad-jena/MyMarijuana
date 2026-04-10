// MapPicker.tsx
"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { LatLng } from "leaflet";
import { Box } from "@mui/material";
import L from "leaflet";

// Fix Leaflet marker icons (must run only in browser)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

type Props = {
  value?: { lat: number; lng: number };
  onChange: (val: { lat: number; lng: number }) => void;
};

function LocationMarker({ value, onChange }: Props) {
  const [position, setPosition] = useState<LatLng | null>(
    value ? new LatLng(value.lat, value.lng) : null
  );

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ value, onChange }: Props) {
  return (
    <Box
      sx={{
        height: 300,
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={value ? [value.lat, value.lng] : [20.2961, 85.8245]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker value={value} onChange={onChange} />
      </MapContainer>
    </Box>
  );
}