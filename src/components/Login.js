import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsAuth }) => {
    let navigate = useNavigate()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            localStorage.setItem('isAuth', true)
            setIsAuth(true)
            // redirecting to home page after login
            navigate("/")
        })
    }

    return (
        <div className="loginPage">
            <img className='bloggy-logo' src='https://cdn-icons-png.flaticon.com/512/60/60736.png' alt='logo'/>
            <h1>Welcome to Bloggy!</h1>
            <h3>Have something on your mind?</h3>
            <h3>Let's write it down!</h3>
            <p>Sign In with Google to Continue</p>
            <button
                className="login-with-google-btn"
                onClick={signInWithGoogle}
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default Login
