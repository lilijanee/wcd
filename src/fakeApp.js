import './App.css';
import Popup from './component/popup'
import { useState } from 'react';
import './component/popup.css';

function App() {

  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="App">
      <h1>Start your journey here</h1>
      <button 
        className='openPopup text-xl font-bold'
        onClick={() => {setOpenPopup(true)}}
      >
        Start Navigation</button>
      {openPopup && <Popup closePopup={setOpenPopup}/>}
    </div>
  );
}

export default App;