import React, {useEffect, useState} from "react"
import {auth, db, storage} from "../firebase"
import {addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc} from "firebase/firestore"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import User from "../components/User"
import MessageForm from "../components/MessageForm"
import Message from "../components/Message"
import {Timestamp} from "@firebase/firestore"

const Home = () => {
	const [users, setUsers] = useState([])
	const [chat, setChat] = useState("")
	const [text, setText] = useState("")
	const [file, setFile] = useState("")
	const [msgs, setMsgs] = useState([])
	
	const user1 = auth.currentUser.uid
	
	const isImage = file => file.name.endsWith("jpeg") || file.name.endsWith("heif") || file.name.endsWith("png") || file.name.endsWith("gif") || file.name.endsWith("svg")
	
	useEffect(() => {
		const usersRef = collection(db, "users")
		const q = query(usersRef)
		const unsub = onSnapshot(q, querySnapshot => {
			let users = []
			querySnapshot.forEach(doc => {
				if (doc._document.key.path.segments[6] !== user1) {
					users.push({...doc.data(), uid: doc._document.key.path.segments[6]})
				}
			})
			setUsers(users)
		})
		return () => unsub()
	}, [])
	
	const selectUser = async user => {
		
		setChat(user)
		const user2 = user.uid
		const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
		const msgsRef = collection(db, "messages", id, "chat")
		const q = query(msgsRef, orderBy("createdAt", "asc"))
		
		onSnapshot(q, (querySnapshot) => {
			let msgs = []
			querySnapshot.forEach(doc => msgs.push(doc.data()))
			setMsgs(msgs)
			setMsgs(msgs)
		})
		
		const docSnap = await getDoc(doc(db, "lastMsg", id))
		if (docSnap.data() && docSnap.data().from !== user1) {
			await updateDoc(doc(db, "lastMsg", id), {unread: false})
		}
	}
	
	const handleSubmit = async e => {
		e.preventDefault()
		const user2 = chat.uid
		const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
		let url
		let fileRef
		if (file) {
			if (isImage(file)) {
				fileRef = ref(storage, `images/${new Date().getTime()} - ${file.name}`)
			} else {
				fileRef = ref(storage, `files/${new Date().getTime()} - ${file.name}`)
			}
			const snap = await uploadBytes(fileRef, file)
			url = await getDownloadURL(ref(storage, snap.ref.fullPath))
		}
		
		await addDoc(collection(db, "messages", id, "chat"), {
			text,
			from: user1,
			to: user2,
			createdAt: Timestamp.fromDate(new Date()),
			media: url || ""
		})
		
		await setDoc(doc(db, "lastMsg", id), {
			text,
			from: user1,
			to: user2,
			createdAt: Timestamp.fromDate(new Date()),
			media: url || "",
			unread: true
		})
		
		setText("")
		setFile("")
	}
	return (<div className="home_container">
		<div className="users_container">
			{users.map(user => <User key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat}/>)}
		</div>
		<div className="messages_container">
			{chat ? <>
				<div className="messages_user"><h3>{chat.name}</h3></div>
				<div className="messages">
					{msgs.length ? msgs.map((msg, i) => (<Message key={i} msg={msg} user1={user1}/>)) : null}
				</div>
				<MessageForm handleSubmit={handleSubmit} text={text} setText={setText} setImg={setFile}/>
			</> : <h3 className="no_conv">Select a user to start conversation</h3>}
		</div>
	</div>)
}

export default Home
