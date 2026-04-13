"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "300px",
};

export default function MapPicker({ location, onChange }: any) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
  });

  const [position, setPosition] = useState({
    lat: location?.lat || 20.2961,
    lng: location?.lng || 85.8245,
  });

  useEffect(() => {
    if (location?.lat && location?.lng) {
      setPosition({ lat: location.lat, lng: location.lng });
    }
  }, [location?.lat, location?.lng]);

  const handleDragEnd = async (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (!lat || !lng) return;

    setPosition({ lat, lng });

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
    );

    const data = await res.json();
    const components = data.results?.[0]?.address_components;

    const get = (type: string) =>
      components?.find((c: any) => c.types.includes(type))?.long_name || "";

    onChange({
      lat,
      lng,
      city: get("locality"),
      state: get("administrative_area_level_1"),
      country: get("country"),
      postalCode: get("postal_code"),
      street: data.results?.[0]?.formatted_address || "",
    });
  };

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={12}>
      <Marker position={position} draggable onDragEnd={handleDragEnd} />
    </GoogleMap>
  );
}