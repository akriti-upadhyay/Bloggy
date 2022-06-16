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
