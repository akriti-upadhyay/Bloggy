import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth, projectFirestore } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

const CreatePost = ({ isAuth }) => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const [title, setTitle] = useState('')
    const [postText, setPostText] = useState('')

    // add a document to our collection 'posts' in firestore database
    const postsCollectionRef = collection(db, 'posts')
    let navigate = useNavigate()
    const createPost = async () => {
        const currentTime = new Date()
        await addDoc(postsCollectionRef, {
            title,
            postText,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
            },
            createdAt: {
                date: currentTime.getDate(),
                month: months[currentTime.getMonth()],
                year: currentTime.getFullYear(),
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
                        placeholder="Enter a Title..."
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="inputGp">
                    <label>Post:</label>
                    <textarea
                        placeholder="Enter the Post..."
                        onChange={(event) => setPostText(event.target.value)}
                    />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost
