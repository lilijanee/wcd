import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import MainMap from "../components/Map2";



export default function Main() {
  
  return (
    <div className='Main-page'>
      <Navbar/>
      <div className='map-container relative flex mt-5 mb-5 mr-5 ml-5'>
        <MainMap/>
      </div>
      
    </div>
  );
}