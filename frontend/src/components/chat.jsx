import React, {useEffect, useState} from 'react'
// import SignOut from "./signout"
import {auth, db} from "../firebase"
import 'react-chatbox-component/dist/style.css'
import SendMessages from "./sendMessages"
import {useAuthState} from "react-firebase-hooks/auth"
import Login from "./Login"

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [counter, setCounter] = useState(1)
    useEffect(() => {
        db.collection("messages").orderBy("createdAt").onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    
    const [isSignIn] = useAuthState(auth)
    return <>
        {isSignIn ? <>
            {/*<SignOut className="signOutButton"/>*/}
            <div className="topChatDiv">
                <img src={auth.currentUser.photoURL} alt=""/>
                <span>{auth.currentUser.displayName}</span>
            </div>
            <section className="chatSection">
                <div className="msgs">
                    {
                        50 * counter < messages.length ?
                            <button className="show-more" onClick={() => setCounter(counter + 1)}> Show More
                                ...</button> :
                            <p className="noMessages">There are no more messages </p>
                    }
                    {
                        messages.slice(-50 * counter).map(({id, text, photoURL, uid, displayName}) => (
                            <div>
                                <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                                    <img className="profile-photo" src={photoURL} alt="" title={displayName}/>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <SendMessages/>
                <div/>
            </section>
        </> : <Login/>}
    </>
    
}

export default Chat
