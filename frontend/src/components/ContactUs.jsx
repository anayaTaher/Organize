import React, {useState} from "react"
import "react-toastify/dist/ReactToastify.css"
import {Alert, Button, CssBaseline} from "@mui/material"
import Header from "./header"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import {headerStyle} from "./signInUp-style"
import ContactMailIcon from '@mui/icons-material/ContactMail'
import {useForm} from "react-hook-form"
import {auth} from "../firebase"
import axios from "axios"

export default function ContactUs() {
	
	const [message, setMessage] = useState("")
	const [success, setSuccess] = useState(false)
	const {register, handleSubmit, formState: {errors}} = useForm()
	
	const onSubmit = data => {
		axios.post(`http://localhost:4000/contact-us`, {
			email: auth.currentUser.email, message
		}).then(res => {
			setSuccess(true)
			setMessage("")
		})
	}
	
	return (
		<>
			<CssBaseline/>
			<Header flag={true}/>
			<ThemeProvider theme={createTheme()}>
				<Container
					component="main"
					maxWidth="xs"
					style={{backgroundColor: "#FFF", paddingBottom: "20px", borderRadius: "5px", marginTop: "-20px"}}
				>
					<CssBaseline/>
					<Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
						<Avatar sx={{m: 1, bgcolor: "#26a69a", marginTop: "30Px"}}>
							<ContactMailIcon/>
						</Avatar>
						<Typography component="h1" variant="h5" style={headerStyle}>Contact us to help</Typography>
						<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
							<TextField
								margin="normal"
								required
								fullWidth
								name="message"
								label="Message"
								type="text"
								id="message"
								{...register("message", {required: "Message is empty!"})}
								error={Boolean(errors["message"])}
								helperText={errors["message"]?.message}
								onChange={(e) => setMessage(e.target.value)}
								value={message}
								multiline
								rows={7}
							/>
							<Button type="submit" fullWidth variant="contained"
									sx={{mt: 3, mb: 2, bgcolor: "#26a69a", padding: "10px"}}>
								Submit
							</Button>
							{(success) &&
								<Alert severity="success"
									   style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
									Your message was sent successfully
								</Alert>
							}
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</>
	)
}
