import * as React from "react"
import {useState} from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import axios from "axios"
import {Alert} from "@mui/material"
import {useForm} from "react-hook-form"


const headerStyle = {
	fontFamily: "sans-serif",
	fontWeight: "bold",
	fontSize: "20px"
}

export default function ForgotPassword() {
	
	const [email, setEmail] = useState("")
	const [err, setErr] = useState(-1)
	const {register, handleSubmit, formState: {errors}} = useForm()
	const onSubmit = data => axios.post('http://localhost:4000/forgotPassword', data).then(res => setErr(res.data))
	
	return <>
		<CssBaseline/>
		<ThemeProvider theme={createTheme()}>
			<Container
				component="main"
				maxWidth="xs"
				style={{
					backgroundColor: "#FFF",
					paddingBottom: "20px",
					borderRadius: "5px",
					marginTop: "-20px"
				}}
			>
				<CssBaseline/>
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<Avatar sx={{m: 1, bgcolor: "#085DFF", marginTop: "30Px"}}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5" style={headerStyle}>
						Hey, Forgot Password !!!
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						sx={{mt: 1}}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							{...register("email", {
								required: "E-mail address is empty!"
							})}
							error={Boolean(errors["email"])}
							helperText={errors["email"]?.message}
							value={email}
							onInput={e => setEmail(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{mt: 3, mb: 2, bgcolor: "#085DFF", padding: "10px"}}
						>
							Request Password Reset
						</Button>
						{(err === 0) &&
							<Alert
								severity="error"
								style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
								The email you entered isn’t connected to an account.
							</Alert>
						}
						{(err === 1) &&
							<Alert
								severity="success"
								style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
								Check you email for a link to reset your password.
							</Alert>
						}
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	</>
}
