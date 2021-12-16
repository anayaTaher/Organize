import React from "react"
import Attachment from "./Attachment"

const MessageForm = ({handleSubmit, text, setText, setImg}) => <form className="message_form" onSubmit={handleSubmit}>
	<label htmlFor="img"> <Attachment/></label>
	<input onChange={e => setImg(e.target.files[0])} type="file" id="img" style={{display: "none"}}/>
	<input type="text" placeholder="Enter message ..." value={text} onChange={e => setText(e.target.value)}/>
	<button className="btn">Send</button>
</form>

export default MessageForm
