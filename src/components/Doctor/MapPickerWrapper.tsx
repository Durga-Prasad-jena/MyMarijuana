"use client";

import dynamic from "next/dynamic";

// Only import MapPicker on client to avoid SSR errors
const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

export default MapPicker;