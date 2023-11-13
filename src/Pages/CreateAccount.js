import { useState } from "react";
import Navbar from "../components/Navbar";
import bg from "../image/image 6.png";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateAccount() {
  let navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    tel: "",
  });
  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit =  () =>{
    axios.post('/register',
        formData,
        { headers: { /* Authorization: 'Bearer ' + token */ }, timeout: 10 * 1000 }
    ).then((response) => {
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
          Create an account
        </h2>
        <div className="self-center flex w-[195] max-w-full items-stretch gap-2.5 mt-1.5">
          <p className="text-black text-center text-xs font-medium">
            Already have an account?
          </p>
          <a
            href="#"
            className="text-black text-center text-xs font-medium underline"
          >
            Sign In
          </a>
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
        <label
          htmlFor="confirm-password"
          className="text-black text-base font-medium max-w-[572px] ml-3 mt-10 self-start ml-2.5"
        >
          Confirmed Password
        </label>
        <TextField
          type={showPassword2 ? "text" : "password"}
          id="confirm-password"
          value={formData.confirmPassword}
          onChange={handleInputChange("confirmPassword")}
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
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword2}
                >
                  {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <label
          htmlFor="phone-number"
          className="text-black text-base font-medium max-w-[572px] ml-3 mt-7 self-start ml-2.5"
        >
          Phone Number
        </label>
        <TextField
          type="text"
          id="tel"
          value={formData.tel}
          onChange={handleInputChange("tel")}
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
        <button
          type="button"
          onClick={handleSubmit}
          className="justify-center text-black text-center text-base font-medium  rounded bg-[#C2EEF4] self-stretch items-center  mt-6 px-5 py-4 max-w-full"
          style={{ zIndex: 1 }}
        >
          Continue
        </button>
      </div>
    </section>
  );
}
