import React, {useEffect, useState} from "react"
import {doc, onSnapshot} from "firebase/firestore"
import {db} from "../firebase"

const User = ({user1, user, selectUser, chat}) => {
	const user2 = user.uid
	const [data, setData] = useState()
	const [imgLoaded, setImgLoaded] = useState(false)
	
	useEffect(() => {
		const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
		let unsub = onSnapshot(doc(db, "lastMsg", id), doc => setData(doc.data()))
		setTimeout(() => setImgLoaded(true), 100)
		
		return () => unsub()
	}, [])
	
	const Img = "https://via.placeholder.com/50/000080/FFF?text=" + user.firstName[0]
	
	return <>
		<div className={`user_wrapper ${chat.name === user.name && "selected_user"}`} onClick={() => selectUser(user)}>
			<div className="user_info">
				<div className="user_detail">
					{imgLoaded && <img src={user.avatar || Img} alt="avatar" className="avatar"/>}
					<div className="cont">
						<h4>{user.firstName} {user.lastName} </h4>
						{data?.from !== user1 && data?.unread && <small className="unread">New Message</small>}
					</div>
					<div className={`user_status ${user.isOnline ? "online" : "offline"}`}/>
				</div>
			</div>
		</div>
	</>
}

export default User
