import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CreatePost from './components/CreatePost'
import Home from './components/Home'
import Login from './components/Login'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'
import './App.css'

const App = () => {
    // determine are we logged-in or not
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            setIsAuth(false)
            // redirect to login page after logging-out
            window.location.pathname = '/login'
        })
    }

    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                {!isAuth ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <>
                        <Link to="/createpost">Create Post</Link>
                        <button onClick={signUserOut}>Log Out</button>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Home isAuth={isAuth} />} />
                <Route
                    path="/createpost"
                    element={<CreatePost isAuth={isAuth} />}
                />
                <Route
                    path="/login"
                    element={<Login setIsAuth={setIsAuth} />}
                />
            </Routes>
        </Router>
    )
}

export default App
