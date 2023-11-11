import './App.css';
import Navbar from "./components/Navbar";
import CreateAccount from "./Pages/CreateAccount";
import { MaterialTailwindProvider } from "@material-tailwind/react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
export default function App() {
  
  return (
    <div className="App">
      <main></main>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<CreateAccount />} />
        </Routes>
      </Router>
    </div>
  )
}
