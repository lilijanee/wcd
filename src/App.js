import { Routes, Route } from 'react-router-dom'
import Main from './Pages/Main';
import Navbar from "./components/Navbar";
import CreateAccount from "./Pages/CreateAccount";
import SignIn from "./Pages/SignIn";
import SignOut from "./Pages/SignOut";

//import { MaterialTailwindProvider } from "@material-tailwind/react";
//import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";

import axios from 'axios'

export default function App() {
  axios.defaults.baseURL = 'http://localhost:3002'

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/Navbar" element={<Navbar />} />
        </Routes>
    </div>
  )
}
