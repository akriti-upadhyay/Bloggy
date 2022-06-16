import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

const CreatePost = ({ isAuth }) => {
    const [title, setTitle] = useState('')
    const [postText, setPostText] = useState('')

    // add a document to our collection 'posts' in firestore database
    const postsCollectionRef = collection(db, 'posts')
    let navigate = useNavigate()
    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            postText,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
            },
        })
        // navigate back to homepage after a post is created
        navigate('/')
    }

    useEffect(() => {
        // if user not authenticated, redirect to login page
        // prevent access from URL
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create a Post</h1>
                <div className="inputGp">
                    <label>Title:</label>
                    <input
                        placeholder="Title..."
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="inputGp">
                    <label>Post:</label>
                    <textarea
                        placeholder="Post..."
                        onChange={(event) => setPostText(event.target.value)}
                    />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost
