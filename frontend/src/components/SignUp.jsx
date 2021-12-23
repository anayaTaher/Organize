import * as React from 'react'
import {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {buttonsContainer, h4, headerStyle, socialButtons, span} from "./signInUp-style"
import {useForm} from "react-hook-form"
import {Alert} from "@mui/material"
import axios from "axios"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Dialog from "@mui/material/Dialog"
import {useHistory} from "react-router-dom"
import {auth, db} from "../firebase"
import firebase from "firebase/compat/app"

export default function SignUp() {
	
	const [first, setFirst] = useState("")
	const [last, setLast] = useState("")
	const [userN, setUserN] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [err, setErr] = useState(false)
	const [confirmCode, setConfirmCode] = useState("")
	const [confirmError, setConfirmError] = useState(false)
	const {register, handleSubmit, formState: {errors}} = useForm()
	
	const [open, setOpen] = React.useState(false)
	const [open2, setOpen2] = React.useState(false)
	const history = useHistory()
	
	const saveAdditionalInfoToFirebaseAndMongoDB = (cred, auto) => {
		let names
		if (auto) {
			names = cred.user.displayName.split(" ")
		}
		db.collection('users').doc(cred.user.uid).set({
			firstName: auto ? names[0] : first,
			lastName: auto ? names[1] : last,
			username: auto ? names[1].toLowerCase() + names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase() : userN,
			isOnline: true,
			avatar: auto ? (cred.user.photoURL ? cred.user.photoURL : null) : null
		}).then(() => history.push("/chat-room"))
	}
	
	const signUpWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		auth.signInWithPopup(provider).then(cred => saveAdditionalInfoToFirebaseAndMongoDB(cred, true))
	}
	const signUpWithFacebook = () => {
		const provider = new firebase.auth.FacebookAuthProvider()
		auth.signInWithPopup(provider).then(cred => saveAdditionalInfoToFirebaseAndMongoDB(cred, true))
	}
	const signUpWithGithub = () => {
		const provider = new firebase.auth.GithubAuthProvider()
		auth.signInWithPopup(provider).then(cred => saveAdditionalInfoToFirebaseAndMongoDB(cred, true))
	}
	
	const checkCode = async () => {
		const res = await axios.post('http://localhost:4000/signup', {email: email, code: confirmCode, flag: 1})
		
		if (Boolean(res.data)) {
			deleteCode()
			auth.createUserWithEmailAndPassword(email, password).then(cred => {
				db.collection('users').doc(cred.user.uid).set({isOnline: true})
				saveAdditionalInfoToFirebaseAndMongoDB(cred, false)
			})
		} else {
			setConfirmError(true)
		}
	}
	
	const deleteCode = () => {
		axios.post('http://localhost:4000/signup', {email: email, flag: 2})
	}
	
	const onSubmit = (data) => {
		if (password === confirmPassword) {
			axios.post('http://localhost:4000/signup', {...data, flag: 0}).then(res => {
				setErr(Boolean(!res.data))
				if (Boolean(res.data)) {
					setOpen(true)
				}
			})
		}
	}
	
	return <>
		<ThemeProvider theme={createTheme()}>
			<Container component="main" maxWidth="xs"
					   style={{backgroundColor: "#FFF", paddingBottom: "20px", borderRadius: "5px", marginTop: "-3%"}}>
				<CssBaseline/>
				<Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<Avatar sx={{m: 1, bgcolor: '#26a69a', marginTop: "30Px"}}><LockOutlinedIcon/></Avatar>
					<Typography component="h1" variant="h5" style={headerStyle}>Create your account</Typography>
					<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									{...register("firstName", {
										required: "First Name is required.",
										pattern: {value: /^[a-z ,.'-]+$/i, message: "Invalid First Name"}
									})}
									error={Boolean(errors["firstName"])}
									helperText={errors["firstName"]?.message}
									value={first}
									onInput={(e) => setFirst(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
									{...register("lastName", {
										required: "Last Name is required.",
										pattern: {value: /^[a-z ,.'-]+$/i, message: "Invalid Last Name"}
									})}
									error={Boolean(errors["lastName"])}
									helperText={errors["lastName"]?.message}
									value={last}
									onInput={(e) => setLast(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
									{...register("username", {
										required: "Username is required.",
										pattern: {value: /^[a-zA-Z0-9]+$/, message: "Invalid Username"}
									})}
									error={Boolean(errors["username"])}
									helperText={errors["username"]?.message}
									value={userN}
									onInput={(e) => setUserN(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									{...register("email", {
										required: "Email Address is required.", pattern: {
											value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: "Invalid Email"
										}
										
									})}
									error={Boolean(errors["email"])}
									helperText={errors["email"]?.message}
									value={email}
									onInput={(e) => setEmail(e.target.value)}
								/>
							</Grid>
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
							<Grid item xs={12}>
								<Typography style={{display: "inline", fontSize: "12px"}}>
									By clicking Sign Up, you agree to the Organize&nbsp;
									<Link onClick={() => setOpen2(true)} href="#">
										Terms & Conditions
									</Link>
								</Typography>
							</Grid>
						</Grid>
						<Button
							type="submit" fullWidth variant="contained"
							sx={{mt: 1, mb: 1, bgcolor: "#26a69a", padding: "10px"}}>
							Sign Up
						</Button>
						{err && <Alert
							severity="error"
							style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
							The email address is already being used.
						</Alert>}
						<h4 style={h4}><span style={span}>Or</span></h4>
						<div style={buttonsContainer}>
							<button onClick={() => signUpWithGoogle()} className="social-buttons" style={socialButtons}>
								<img
									src="https://img.icons8.com/color/48/google-logo.png" alt=""
									style={{width: "80%"}}/>
							</button>
							<button onClick={() => signUpWithFacebook()} className="social-buttons"
									style={socialButtons}>
								<img
									src="https://img.icons8.com/ios-filled/48/1778F2/facebook-new.png" alt=""
									style={{width: "80%"}}/>
							</button>
							<button className="social-buttons" style={socialButtons}>
								<img
									src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt=""
									style={{width: "80%"}}/>
							</button>
							<button onClick={() => signUpWithGithub()} className="social-buttons" style={socialButtons}>
								<img
									src="https://img.icons8.com/ios-filled/50/000000/github.png" alt=""
									style={{width: "80%"}}/>
							</button>
						</div>
						<Grid container justifyContent="flex-end">
							<Grid item style={{display: "flex", justifyContent: "center", width: "100%"}}>
								<Typography style={{display: "inline", marginLeft: "-3%"}}>
									Already have an account?
									<Link href="/login" style={{cursor: 'pointer'}}> Login</Link>
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Dialog open={open}>
					<DialogTitle>Email Confirmation</DialogTitle>
					<DialogContent>
						<DialogContentText>We just sent a confirmation code to <b>{email}</b></DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="confirmationCode"
							label="Confirmation Code"
							type="confirmationCode"
							fullWidth
							variant="standard"
							value={confirmCode}
							onInput={e => setConfirmCode(e.target.value)}
						/>
						{confirmError && <Alert
							severity="error"
							style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
							The code entered is incorrect.
						</Alert>}
					</DialogContent>
					<DialogActions>
						<Button onClick={() => {
							setOpen(false)
						}}>Cancel</Button>
						<Button onClick={checkCode}>Confirm</Button>
					</DialogActions>
				</Dialog>
				<Dialog open={open2}>
					<DialogTitle>Terms and Conditions</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<h5>Terms and conditions</h5>
							<p>
								These terms and conditions set forth the general terms and conditions of your use of
								this website and any of its related products and services. This Agreement is legally
								binding between you and this Website operator. If you are entering into this agreement
								on behalf of a business or other legal entity, you represent that you have the authority
								to bind such entity to this agreement. If you do not have such authority, or if you do
								not agree with the terms of this agreement, you must not accept this agreement and may
								not access and use the Website and Services. By accessing and using the Website and
								Services, you acknowledge that you have read, understood, and agree to be bound by the
								terms of this Agreement. You acknowledge that this Agreement is a contract between you
								and the Operator, even though it is electronic and is not physically signed by you, and
								it governs your use of the Website and Services.
							</p>
							<h5>Accounts and membership</h5>
							<p>
								You must be at least 18 years of age to use the Website and Services. By using the
								Website and Services and by agreeing to this Agreement you warrant and represent that
								you are at least 18 years of age. If you create an account on the Website, you are
								responsible for maintaining the security of your account and you are fully responsible
								for all activities that occur under the account and any other actions taken in
								connection with it. We may, but have no obligation to, monitor and review new accounts
								before you may sign in and start using the Services. Providing false contact information
								of any kind may result in the termination of your account. You must immediately notify
								us of any unauthorized uses of your account or any other breaches of security. We will
								not be liable for any acts or omissions by you, including any damages of any kind
								incurred as a result of such acts or omissions. We may suspend, disable, or delete your
								account (or any part thereof) if we determine that you have violated any provision of
								this Agreement or that your conduct or content would tend to damage our reputation and
								goodwill. If we delete your account for the foregoing reasons, you may not re-register
								for our Services. We may block your email address and Internet protocol address to
								prevent further registration.
							</p>
							<h5>User content</h5>
							<p>
								We do not own any data, information or material (collectively, “Content”) that you
								submit on the Website in the course of using the Service. You shall have sole
								responsibility for the accuracy, quality, integrity, legality, reliability,
								appropriateness, and intellectual property ownership or right to use of all submitted
								Content. We may, but have no obligation to, monitor and review the Content on the
								Website submitted or created using our Services by you. You grant us permission to
								access, copy, distribute, store, transmit, reformat, display and perform the Content of
								your user account solely as required for the purpose of providing the Services to you.
								Without limiting any of those representations or warranties, we have the right, though
								not the obligation, to, in our own sole discretion, refuse or remove any Content that,
								in our reasonable opinion, violates any of our policies or is in any way harmful or
								objectionable. You also grant us the license to use, reproduce, adapt, modify, publish
								or distribute the Content created by you or stored in your user account for commercial,
								marketing or any similar purpose.
							</p>
							<h5>Intellectual property rights</h5>
							<p>
								“Intellectual Property Rights” means all present and future rights conferred by statute,
								common law or equity in or in relation to any copyright and related rights, trademarks,
								designs, patents, inventions, goodwill and the right to sue for passing off, rights to
								inventions, rights to use, and all other intellectual property rights, in each case
								whether registered or unregistered and including all applications and rights to apply
								for and be granted, rights to claim priority from, such rights and all similar or
								equivalent rights or forms of protection and any other results of intellectual activity
								which subsist or will subsist now or in the future in any part of the world. This
								Agreement does not transfer to you any intellectual property owned by the Operator or
								third parties, and all rights, titles, and interests in and to such property will remain
								(as between the parties) solely with the Operator. All trademarks, service marks,
								graphics and logos used in connection with the Website and Services, are trademarks or
								registered trademarks of the Operator or its licensors. Other trademarks, service marks,
								graphics and logos used in connection with the Website and Services may be the
								trademarks of other third parties. Your use of the Website and Services grants you no
								right or license to reproduce or otherwise use any of the Operator or third party
								trademarks.
							</p>
							<h5>Acceptance of these terms</h5>
							<p>
								You acknowledge that you have read this Agreement and agree to all its terms and
								conditions. By accessing and using the Website and Services you agree to be bound by
								this Agreement. If you do not agree to abide by the terms of this Agreement, you are not
								authorized to access or use the Website and Services
							</p>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setOpen2(false)}>Close</Button>
					</DialogActions>
				</Dialog>
			< /Container>
		</ThemeProvider>
	</>
}
