import './SignIn.css';
import bg from '../image/background.png';
export default function CreateAccount() {
    return(
        <div>
            <img className='kuy' src={bg} alt="bg" />        
            <h1> Sign In</h1>
            <h2>Do not have any account? <a href="url">Sign up</a></h2>
            <form action='/google.com'>
            <h3>Username</h3>
            <input type="text" id="Username" name="Username"></input>
            <h3>Password</h3>
            <input type="text" id="Password" name="Password"></input>
            </form>
        </div>
    )
}