import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase-config'

function Home({ isAuth }) {
    const [postLists, setPostList] = useState([])
    const [randstate, setRandstate] = useState(0)
    const postsCollectionRef = collection(db, 'posts')

    const deletePost = async (id) => {
        // post which we want to delete
        setRandstate(randstate + 1)
        const postDoc = doc(db, 'posts', id)
        await deleteDoc(postDoc)
    }

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getPosts()
    }, [randstate])

    return (
        <div className="homePage">
            {postLists.map((post) => {
                return (
                    <div className="post">
                        <div className="postHeader">
                            <div className="title">
                                <h1>{post.title}</h1>
                            </div>
                            <div className="deletePost">
                                {isAuth &&
                                    post.author.id === auth.currentUser.uid && (
                                        <button
                                            onClick={() => deletePost(post.id)}
                                        >
                                            &#128465;
                                        </button>
                                    )}
                            </div>
                        </div>
                        <div className="postTextContainer">{post.postText}</div>
                        <h3>
                            <div id='author'>@ {post.author.name}</div>
                            <div id='date'>{`${post.createdAt.date} ${post.createdAt.month} ${post.createdAt.year}`}</div>
                        </h3>
                    </div>
                )
            })}
        </div>
    )
}

export default Home
