import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import CreateAccount from "./Pages/CreateAccount";
//import { MaterialTailwindProvider } from "@material-tailwind/react";
//import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
export default function App() {
  
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<CreateAccount />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/Navbar" element={<Navbar />} />
        </Routes>
    </div>
  )
}
