import React, {useState} from 'react'
import {auth, db} from '../firebase'
import firebase from 'firebase'
import {Button, Input} from '@material-ui/core'
import SendIcon from '@mui/icons-material/Send'

const SendMessages = () => {
    const [msg, setMsg] = useState('')
    
    async function SendMessages(e) {
        e.preventDefault()
        let msgTemp = msg
        setMsg('')
        if (msg !== "") {
            const {uid, photoURL, displayName} = auth.currentUser
            await db.collection('messages').add({
                text: msgTemp,
                photoURL,
                uid,
                displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }
    
    return <>
        <form className="sendMsg" onSubmit={SendMessages}>
            <Input
                placeholder="Your Message..."
                className="input"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                margin="normal"
            />
            <Button type="submit"> <SendIcon/></Button>
        </form>
    </>
}

export default SendMessages
