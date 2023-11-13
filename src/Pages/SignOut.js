
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

function SignOut() {

    let [cookies, removeCookie] = useCookies(['token'])
    let navigate = useNavigate()

	useEffect(() => {
        removeCookie('token')
        navigate('/signin')
	}, [])

    return (
        <div id="outer-container">
            <div id="page-wrap">
                <center>
                    <h1>กำลังออกจากระบบ</h1>
                </center>
            </div>
        </div>
    )
  }
  
  export default SignOut