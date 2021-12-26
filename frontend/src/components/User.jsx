import React, {useEffect, useState} from "react"
import Img from "../assets/images/avatar.png"
import {doc, onSnapshot} from "firebase/firestore"
import {db} from "../firebase"

const User = ({user1, user, selectUser, chat}) => {
	const user2 = user.uid
	const [data, setData] = useState()
	const [imgLoaded, setImgLoaded] = useState(false)
	
	const isImage = file => file.endsWith("jpeg") || file.endsWith("heif") || file.endsWith("png") || file.endsWith("gif") || file.endsWith("svg")
	
	useEffect(() => {
		const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
		let unsub = onSnapshot(doc(db, "lastMsg", id), doc => setData(doc.data()))
		setTimeout(() => setImgLoaded(true), 100)
		
		return () => unsub()
	}, [])
	
	
	return <>
		<div className={`user_wrapper ${chat.name === user.name && "selected_user"}`} onClick={() => selectUser(user)}>
			<div className="user_info">
				<div className="user_detail">
					{imgLoaded && <img src={user.avatar || Img} alt="avatar" className="avatar"/>}
					<h4>{user.firstName} {user.lastName} </h4>
					{data?.from !== user1 && data?.unread && <small className="unread">New</small>}
				</div>
				<div className={`user_status ${user.isOnline ? "online" : "offline"}`}/>
			</div>
			{data && <p className="truncate"><strong>{data.from === user1 ? "Me" : user.firstName}:</strong>
				{data.text ? data.text : (isImage(data.media) ? "Sent an image, click to see it" : "Sent a file, click to see it")}
			</p>}
		</div>
		<div onClick={() => selectUser(user)} className={`sm_container `}>
			<img src={user.avatar || Img} alt="avatar" className="avatar sm_screen"/>
		</div>
	</>
}

export default User
