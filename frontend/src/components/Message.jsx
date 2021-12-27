import React, {useEffect, useRef} from "react"
import Moment from "react-moment"
import "../App.css"

const Message = ({msg, user1}) => {
	const scrollRef = useRef()
	useEffect(() => scrollRef.current?.scrollIntoView({behavior: "smooth"}), [msg])
	
	return <>
		
		<div className={`message_wrapper ${msg.from === user1 ? "own" : ""}`} ref={scrollRef}>
			<p className={msg.from === user1 ? "me" : "friend"}>
				{(msg.media && msg.media.indexOf("images") > 0 && <img src={msg.media} alt={msg.text}/>)}
				{msg.media && <a style={{color: "#000"}} href={msg.media}>
					{msg.media.split("?")[0].split("%20-%20")[1].replaceAll("%20", " ")}
				</a>}
				{msg.text}
				<br/>
				<small style={{marginTop:"0", color:"#DDD"}}> <Moment fromNow>{msg.createdAt.toDate()}</Moment></small>
			</p>
		</div>
	</>
}

export default Message
