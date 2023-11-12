import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};



const MainMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const defaultCenter = { lat: 13.736717, lng: 100.523186 };
  const [center, setCenter] = useState(defaultCenter);
  const [mapInstance, setMapInstance] = useState(null);
  const [startPosition,setStartPosition] = useState(null);
  const [endPosition,setEndPosition] = useState(null);
  const [destPosition,setdestPosition] = useState(null);
  const centerRef = useRef(defaultCenter);
  const startRef = useRef(defaultCenter);
  const originRef = useRef(defaultCenter);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        centerRef.current = { lat: latitude, lng: longitude };
        startRef.current = { lat: latitude, lng: longitude };
        setCenter({lat: position.coords.latitude,lng: position.coords.longitude})
        console.log("center in useEffect", { latitude, longitude });
      });
    } else {
      centerRef.current = defaultCenter;
      setCenter(defaultCenter);
    }
    console.log("useEffect is being called");
  }, []);

  const handleLoad = (map) => {
    console.log("handleLoad is being called");
    console.log("Current center:", centerRef.current);

    // Set the center and zoom of the map
    map.setCenter(center);
    map.setZoom(16);
    setMapInstance(map);

    const defaultPosition = { lat: 13.736717, lng: 100.523186 };
    // Create a new marker at the current geolocation.
    const marker = new window.google.maps.Marker({
      position: defaultPosition,
      map,
      title: "Your current location",
    });
    // Add a marker to the map
    marker.setPosition(defaultPosition);

    // if the user allows access to the current location, then the marker will change location.
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position) {
        console.log("center in setMarker function", center.lat, center.lng);
        marker.setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log("changed marker to the current location");
      }
    });

    const startAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("Start"),
      {
        types: ["establishment"],
        componentRestrictions: { country: ["TH"] },
        fields: ["place_id", "geometry", "name"],
      }
    );
    const startInput = document.getElementById("Start");
    startInput.addEventListener("change", (event) => {
    const startAddress = event.target.value;
  
    startAutocomplete.addListener("place_changed", (event) => {
      const place = startAutocomplete.getPlace();
      startRef.current = { lat: place.geometry.location.lat(), lng:place.geometry.location.lng() };
      console.log("startRef current :",startRef.current.lat,startRef.current.lng)
      
    })
    
  });
 
  

    const endAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("End"),
      {
        types: ["establishment"],
        componentRestrictions: { country: ["TH"] },
        fields: ["place_id", "geometry", "name"],
      }
    );
    const destinationInput = document.getElementById("End");
    destinationInput.addEventListener("change", (event) => {
    const destinationAddress = event.target.value;
  
    endAutocomplete.addListener("place_changed", (event) => {
      const place = endAutocomplete.getPlace();
      setEndPosition(place.formatted_address);
      setdestPosition(place.name);
    })
    const startButton = document.getElementById("startNavigationButton");

    // Add a click event listener to the button
    startButton.addEventListener("click", () => {
      // Clear previous navigation
      
      startNavigation();
  });
    
  });
  };
  
  const startNavigation = () => {
    
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setDirections(null);
    directionsRenderer.setMap(null);
    const startValue = document.getElementById("Start").value;

    if (startValue) {
      originRef.current = startRef.current;
    } else {
      originRef.current = centerRef.current;
    }
    
    directionsService.route(
      {
        origin: originRef.current,
        destination: destPosition, // Use destPosition instead of place.name
        travelMode: window.google.maps.TravelMode.TRANSIT,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log("direction function is successed");
          directionsRenderer.setDirections(result);
          directionsRenderer.setMap(mapInstance);
        } else {
          console.error("Error calculating directions:", status);
        }
      }
    );
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={16}
      center={center}
      onLoad={handleLoad}
    >
      <center>
        <div
          className="input-container relative top-0 w-5/12 p-4"
          style={{ zIndex: "100", backgroundColor: "white", borderRadius: "10px" }}
        >
          <label>Start</label>
          <input type="text" id="Start" className="border-2 p-1 ml-2" />
          <br />

          <label>End</label>
          <input type="text" id="End" className="border-2 p-1 ml-2" />
          <br />

          {/* Use a unique ID for the button */}
          <button id="startNavigationButton" onClick={startNavigation}>Start Navigation</button>
        </div>
      </center>
    </GoogleMap>
  );
};

export default MainMap;