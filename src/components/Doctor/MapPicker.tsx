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
    lat: location?.lat || 40.2767864802915,
    lng: location?.lng || -99.80508851970849,
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
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
    );

    const data = await res.json();
    console.log('data', data)
    const components = data.results?.[0]?.address_components;

    const get = (type: string) =>
      components?.find((c: any) => c.types.includes(type))?.long_name || "";

    const  street = data.results?.[0]?.formatted_address.split(",")

    onChange({
      lat,
      lng,
      city: get("locality"),
      state: get("administrative_area_level_1"),
      // country: get("country"),
      postalCode: get("postal_code"),
      street: street[0] || "",
    });
  };

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={6}>
      <Marker position={position} draggable onDragEnd={handleDragEnd} />
    </GoogleMap>
  );
}