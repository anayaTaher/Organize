import React from "react"
import AttachmentIcon from '@mui/icons-material/Attachment';
import {IoSend} from "react-icons/all"

const MessageForm = ({handleSubmit, text, setText, setImg}) => <form className="message_form" onSubmit={handleSubmit}>
	<label htmlFor="img"> <AttachmentIcon style={{fontSize:"40px", color:"#26a69a"}}/></label>
	<input onChange={e => setImg(e.target.files[0])} type="file" id="img" style={{display: "none"}}/>
	<input type="text" placeholder="Aa" value={text} onChange={e => setText(e.target.value)} style={{
		borderRadius:"10px",
		width:"100%"
		
	}}/>
	<IoSend style={{fontSize:"40px", color:"#26a69a"}}/>
</form>

export default MessageForm
