import * as React from 'react'
import {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {headerStyle} from "./signInUp-style"
import {useForm} from "react-hook-form"
import axios from "axios"
import {useHistory, useParams} from "react-router-dom"
import Header from "./header"

export default function ResetPassword() {
	
	const history = useHistory()
	const parameters = useParams()
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const {register, handleSubmit, formState: {errors}} = useForm()
	axios.post(`http://192.168.1.242:4000/reset-password/${parameters.id}/${parameters.token}`, {
		...parameters, flag: 0
	}).then(res => {
		if (!res.data) {
			history.push("/login")
		}
	})
	
	const onSubmit = (data) => {
		if (password === confirmPassword) {
			axios.post(`http://192.168.1.242:4000/reset-password/${parameters.id}/${parameters.token}`, {
				...data, flag: 1
			}).then(res => {
				if (Boolean(res.data)) {
					history.push("/login")
				}
			})
		}
	}
	
	return <>
		<ThemeProvider theme={createTheme()}>
		<Header flag={true}/>
			<Container component="main" maxWidth="xs"
					   style={{backgroundColor: "#FFF", paddingBottom: "20px", borderRadius: "5px", marginTop: "-3%"}}>
				<CssBaseline/>
				<Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<Avatar sx={{m: 1, bgcolor: '#26a69a', marginTop: "30Px"}}><LockOutlinedIcon/></Avatar>
					<Typography component="h1" variant="h5" style={headerStyle}>Reset Password !!!</Typography>
					<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									{...register("password", {
										required: "Password is required.", pattern: {
											value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
											message: "Invalid Password"
										}
									})}
									error={Boolean(errors["password"])}
									helperText={errors["password"]?.message}
									value={password}
									onInput={(e) => setPassword(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									autoComplete="new-password"
									{...register("confirmPassword", {
										required: "Confirm is required.", pattern: {
											value: password, message: "Passwords is mismatch"
										}
									})}
									error={Boolean(errors["confirmPassword"]) || confirmPassword !== password}
									helperText={errors["confirmPassword"]?.message}
									value={confirmPassword}
									onInput={e => setConfirmPassword(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit" fullWidth variant="contained"
							sx={{mt: 1, mb: 1, bgcolor: "#26a69a", padding: "10px"}}>
							Change Password
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	</>
}
