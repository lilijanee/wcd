import { Routes, Route } from 'react-router-dom'
import Main from './Pages/Main';
import Navbar from "./components/Navbar";
import CreateAccount from "./Pages/CreateAccount";
import SignIn from "./Pages/SignIn";

//import { MaterialTailwindProvider } from "@material-tailwind/react";
//import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";

import axios from 'axios'

export default function App() {
  axios.defaults.baseURL = 'https://localhost:7164'

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/Navbar" element={<Navbar />} />
        </Routes>
    </div>
  )
}
