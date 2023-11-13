import React from "react";
import Logo from "../image/Logo.png";
import { Link } from 'react-router-dom'
export default function Navbar({ fixed }) {

  //ok until 360 below
  return (
    <nav className="relative flex flex-nowrap items-center justify-around px-2 py-3 mb-3" style={{ background: '#D2EFF3',boxShadow:" 0px 2px 4px 0px rgba(0, 0, 0, 0.25)" }}>
        <div className="container flex  w-full relative flex-nowrap justify-start items-center ml-2">
            <img alt="Logo" src={Logo} className="w-12 h-12"style={{display:"block"}}/>
            <div className="name-container w-fit relative flex flex-col justify-start ml-0">
                <h1 style={{display:"inline-block",marginLeft:"5%",fontSize:"0.8rem",color:"#507386",height:"fit-content"}}>GO GO FAST AND DRIFT WITH</h1>
                <a
                className="font-bold leading-relaxed relative inline-block mr-4 py-0 whitespace-nowrap text-black"
                href="/" style={{textShadow:"-1px 1px 3px rgba(0, 0, 0, 0.29)", fontSize:"1.65rem",height:"fit-content"}}
                >
                WheelChairDrift
                </a>
            </div>
        </div>
        <div className="button-container w-fit relative flex flex-nowrap mr-1 justify-end items-center">
            <button style={{background:"rgba(188, 215, 218, 0.87)" , borderRadius:"0.25rem" , width:"4.5rem" , height:"1.5rem"}}><Link to="/signout">Log out</Link></button>
        </div>
    </nav>

  );}