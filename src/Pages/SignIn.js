import { useState } from "react";
import Navbar from "../components/Navbar";
import bg from "../image/image 6.png";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function SignIn() {
  let navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  let [cookies, setCookie] = useCookies(['token'])

  const handleSubmit =  () =>{
    axios.post('/login',
        formData,
        { headers: { /* Authorization: 'Bearer ' + token */ }, timeout: 10 * 1000 }
    ).then((response) => {
        setCookie('token', response.data.token)
        navigate('/main')
    }).catch((error) => {
        if (error.code === 'ECONNABORTED') {
            console.log('timeout')
        } else {
            console.log(error.response.status)
        }
    })
  }

  return (
    <section className="bg-stone-50 flex flex-col items-stretch text">
      <img
        class="w-full h-full bg-scroll left-0 top-0 absolute blur-[5px]"
        alt="bg"
        src={bg}
      />
      <Navbar />
      <div className="self-center flex w-[547px] max-w-full flex-col mt-24 mb-32 px-5 my-10">
        <h2 className="text-teal-500 text-center text-2xl font-bold font-['Inter'] drop-shadow-2xl self-stretch ml-0 mr-0 max-w-full">
          Sign In
        </h2>
        <div className="self-center flex w-[195] max-w-full items-stretch gap-2.5 mt-1.5">
          <p className="text-black text-center text-xs font-medium">
            Do not have any account?
          </p>
          <p
            className="text-black text-center text-xs font-medium underline"
          ><Link to ="/signup">
            Sign Up</Link>
              </p>
        </div>
        <label
          htmlFor="username"
          className="text-black text-base font-medium max-w-[572px] ml-3 mt-6 self-start "
        >
          Username
        </label>

        <TextField
          type="text"
          id="username"
          value={formData.username}
          onChange={handleInputChange("username")}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.375rem", // Equivalent to Tailwind's rounded
              backgroundColor: "#E3E3E3", // Background color
              height: "30px", // Height
              "& fieldset": {
                borderColor: "#E3E3E3", // Border color
              },
            },
            marginTop: "1.5rem",
          }}
          
        />


        <label
          htmlFor="password"
          className="text-black text-base font-medium max-w-[572px] ml-3 mt-7 self-start ml-2.5"
        >
          Password
        </label>
        <TextField
          type={showPassword ? "text" : "password"}
          id="password"
          value={formData.password}
          onChange={handleInputChange("password")}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.375rem", // Equivalent to Tailwind's rounded
              backgroundColor: "#E3E3E3", // Background color
              height: "30px", // Height
              "& fieldset": {
                borderColor: "#E3E3E3", // Border color
              },
            },
            marginTop: "1.5rem",
          }}
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="justify-center text-black text-center text-base font-medium  rounded bg-[#C2EEF4] self-stretch items-center  mt-6 px-5 py-4 max-w-full"
          style={{ zIndex: 1 }}
        >
          Start the Journey
        </button>
      </div>
    </section>
  );
}
