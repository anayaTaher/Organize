import React from "react"
import AttachmentIcon from '@mui/icons-material/Attachment'
import SendIcon from '@mui/icons-material/Send'

const MessageForm = ({handleSubmit, text, setText, setImg}) => <>
	<form className="message_form" onSubmit={handleSubmit}>
		<label htmlFor="img"> <AttachmentIcon sx={{
			fontSize: "40px", color: "#26a69a", ":hover": {cursor: "pointer"}
		}}/></label>
		<input onChange={e => setImg(e.target.files[0])} type="file" id="img" style={{display: "none"}}/>
		<input type="text" placeholder="Aa" value={text} onChange={e => setText(e.target.value)} style={{
			borderRadius: "10px",
			width: "100%"
		}}/>
		<SendIcon onClick={handleSubmit} sx={{fontSize: "40px", color: "#26a69a", ":hover": {cursor: "pointer"}}}/>
	</form>
</>

export default MessageForm
