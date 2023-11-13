import React, { useState, useEffect, useRef } from "react";
import Popup from "./popup";
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
  const destRef = useRef(defaultCenter);

  const [showPopup, setShowPopup] = useState(false);
  const pop = () => {
    setShowPopup(!showPopup);
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const confirm = () => {
    setShowPopup(false);
    startNavigation();
  };

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
      destRef.current = { lat: place.geometry.location.lat(), lng:place.geometry.location.lng() };
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
    originRef.current.value = "";
    destRef.current.value = "";
    const startValue = document.getElementById("Start").value;

    if (startValue) {
      originRef.current = startRef.current;
    } else {
      originRef.current = centerRef.current;
    }
    
    //window.location.href = `https://www.google.com/maps/dir/?api=1&origin=${originRef.current.lat},${originRef.current.lng}&destination=${destRef.current.lat},${destRef.current.lng}&travelmode=transit;`;

    directionsService.route(
      {
        origin: originRef.current,
        destination: destRef.current, // Use destPosition instead of place.name
        travelMode: window.google.maps.TravelMode.TRANSIT,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        optimizeWaypoints: true,
        provideRouteAlternatives: false,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log("direction function is successed");
          directionsRenderer.setDirections(result);
          directionsRenderer.setMap(mapInstance);
          directionsRenderer.setPanel(document.getElementById("sidebar"))
        } else {
          console.error("Error calculating directions:", status);
        }
      }
    );
  };
  
  // Call directionsRenderer.setPanel() outside of the startNavigation function
  ;

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
      disableDefaultUI={"true"} 
      onLoad={handleLoad}
    >
      <center>
        <div
          className="input-container relative w-5/12 p-4"
          style={{ zIndex: "100", backgroundColor: "white", borderRadius: "10px" }}
        >
          <div className="input-box mt-5 relative items-start" style={{width:"12rem"}}>
            <div className="Start-container relative flex items-center justify-start w-fit">
            <label>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9.99996 13.3333C11.8409 13.3333 13.3333 11.8409 13.3333 9.99999C13.3333 8.15904 11.8409 6.66666 9.99996 6.66666C8.15901 6.66666 6.66663 8.15904 6.66663 9.99999C6.66663 11.8409 8.15901 13.3333 9.99996 13.3333Z" fill="#6CBFCA"/>
                <path d="M10.8333 3.39082V1.66666H9.16663V3.39082C7.70021 3.57806 6.33743 4.2468 5.2921 5.29213C4.24677 6.33746 3.57803 7.70024 3.39079 9.16666H1.66663V10.8333H3.39079C3.57775 12.2998 4.24641 13.6628 5.29179 14.7082C6.33717 15.7535 7.7001 16.4222 9.16663 16.6092V18.3333H10.8333V16.6092C12.2999 16.4223 13.6629 15.7537 14.7083 14.7083C15.7537 13.6629 16.4223 12.2999 16.6091 10.8333H18.3333V9.16666H16.6091C16.4222 7.70013 15.7535 6.3372 14.7081 5.29182C13.6627 4.24644 12.2998 3.57778 10.8333 3.39082ZM9.99996 15C7.24246 15 4.99996 12.7575 4.99996 9.99999C4.99996 7.24249 7.24246 4.99999 9.99996 4.99999C12.7575 4.99999 15 7.24249 15 9.99999C15 12.7575 12.7575 15 9.99996 15Z" fill="#6CBFCA"/>
              </svg>
            </label>
            <input type="text" id="Start" className="flex w-10/12 border-2 p-1 m-2 rounded" />
            </div>
            <br/>

            <div className="End-container relative flex items-center justify-start w-fit">
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1.25C6.54961 1.25 3.75 3.76992 3.75 6.875C3.75 11.875 10 18.75 10 18.75C10 18.75 16.25 11.875 16.25 6.875C16.25 3.76992 13.4504 1.25 10 1.25ZM10 10C9.50555 10 9.0222 9.85338 8.61107 9.57867C8.19995 9.30397 7.87952 8.91352 7.6903 8.45671C7.50108 7.99989 7.45157 7.49723 7.54804 7.01227C7.6445 6.52732 7.8826 6.08186 8.23223 5.73223C8.58186 5.3826 9.02732 5.1445 9.51227 5.04804C9.99723 4.95157 10.4999 5.00108 10.9567 5.1903C11.4135 5.37952 11.804 5.69995 12.0787 6.11107C12.3534 6.5222 12.5 7.00555 12.5 7.5C12.4993 8.16282 12.2357 8.79828 11.767 9.26697C11.2983 9.73565 10.6628 9.99928 10 10Z" fill="#D24242"/>
                </svg>
              </label>
              <input type="text" id="End" className="flex w-10/12 border-2 p-1 m-2 rounded" />
            </div>
          </div>

          {/* Use a unique ID for the button */}
          <button className="relative flex flex-nowrap m-3 p-2" 
          style={{backgroundColor:"#D2EFF3", borderRadius:"6px",zIndex: 1}} 
          id="startNavigationButton" 
          onClick={() => {
            //startNavigation();
            pop()
            }}>Start Navigation</button>
            {showPopup && <Popup  closePopup={closePopup} confirm={confirm}/>}
        </div>
        
        
      </center>
    </GoogleMap>
  );
};

export default MainMap;