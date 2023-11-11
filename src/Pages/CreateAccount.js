import './CreateAccount.css';
import lg2 from '../image/logo2.png';
import bg from '../image/background.png'; // import the new background image

export default function CreateAccount() {
  return (
    <div > {/* set the new background image */}
     
      <h1> Create an account</h1>
      <h2>Already have an account?  
        <a 
        href="https://www.google.com/"
        title="   Sign in">
          Sign in</a>
      </h2>
  
      <form action='/google.com'>
        <h3>Username</h3>
        <input type="text" id="Username" name="Username"></input>
        <h3>Password</h3>
        <input type="text" id="Password" name="Password"></input>
        <h3>ConfirmedPassword</h3>
        <input type="text" id="ConfirmedPassword" ></input>
        <h3>PhoneNumber</h3>
        <input type="password" id="PhoneNumber" name="PhoneNumber"></input>
        <button  id="Con">Continue</button>
      </form>
    </div>
  )
}
