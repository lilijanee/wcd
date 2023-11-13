import React from 'react'
import "./popup.css";
import { Crosshair, DollarSign, MapPin } from 'react-feather';

function popup({ closePopup }) {
  return (
   <div className='popupBackround fixed inset-0 flex items-center justify-center bg-[#FDFAF4]' >
   <div className='popupContainer p-6 rounded-xl shadow-xl shadow-[#868686] bg-[#FFF8ED]'>
      {/* <div className='titleCloseBtn p-1 justify-end w-full'>
         <button onClick={() => closePopup(false)} className=" text-gray flex "> x </button>
      </div> */}
      <div className='title'>
         <h1 className="text-xl font-bold mt-1">Confirm Destination and Payment</h1>
      </div>

      <div className='body text-[#0f0f0f] mt-4' >
         <div className='flex items-center'>
            <Crosshair color="#6CBFCA" size={24} strokeWidth={2.5} padd />
            <h1 className="text-lg flex items-left pl-2">(Start Location)</h1>    
         </div>  
         <div className='mt-4 flex items-center'>
            <MapPin color="#BF6A69" size={24} strokeWidth={2.5} padd />
            <h1 className="text-lg flex items-left pl-2">(Destination)</h1>
         </div>
         <div className='mt-4 flex items-center'>
            <DollarSign color="#767676" size={24} strokeWidth={2.5} padd />  
            <h1 className="text-lg flex items-left pl-2">0.5 Dollar</h1>
         </div>
      </div>

      <div className='footer text-xl inset-0 mt-6 flex justify-center items-center'>
         <button onClick={() => closePopup(false)} className="mr-2 w-full px-6 py-1 text-black bg-[#FF9F9F] rounded">
            Cancel</button>
         <button className="px-6 py-1 text-black bg-[#BCD7DA] rounded w-full">Confirm</button>
      </div>
      <div className='anotherfooter mt-2 flex justify-center text-[#868686]'>
         <p>Fee will included to 088-888-8888</p>
      </div>
   </div>
</div>

   // <div className='popupBackround'>
   //    <div className='popupContainer'>
   //       <div className='titleCloseBtn'>
   //          <button onClick = { () => closePopup(false)} className="absolute top-2 right-2 p-1 rounded-lg text-gray"> x </button>
   //       </div>
   //       <div className='title'>
   //          <h1>Are you sure you want to continue?</h1>
   //       </div>
   //       <div className='body'></div>
   //          <h1>the max page is awesome</h1>
   //       <div className='footer'>
   //          <button onClick = {() => closePopup(false)}>Cancel</button>
   //          <button>Confirm</button>
   //       </div>
         

   //    </div>
   // </div>
  )
  
}

export default popup