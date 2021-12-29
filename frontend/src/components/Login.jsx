import * as React from "react"
import {useState} from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {buttonsContainer, forgotPassword, h4, socialButtons, span} from "./signInUp-style"
import {auth, db} from "../firebase"
import firebase from 'firebase/compat/app'
import axios from "axios"
import {Alert} from "@mui/material"
import {useForm} from "react-hook-form"
import {useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {signIn} from "../reducers/actions/action"
import Header  from "./header"

const headerStyle = {
	fontFamily: "sans-serif",
	fontWeight: "bold",
	fontSize: "20px"
}

export default function Login() {
	
	const history = useHistory()
	
	const saveAdditionalInfoToFirebaseAndMongoDB = (cred) => {
		const names = cred.user.displayName.split(" ")
		db.collection('users').doc(cred.user.uid).update({
			firstName: names[0],
			lastName: names[1],
			username: names[1].toLowerCase() + names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase(),
			isOnline: true,
			avatar: cred.user.photoURL ? cred.user.photoURL : null
		}).then(() => history.push("/chat-room"))
	}
	
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		auth.signInWithPopup(provider).then(cred => saveAdditionalInfoToFirebaseAndMongoDB(cred))
	}
	const signInWithFacebook = () => {
		const provider = new firebase.auth.FacebookAuthProvider()
		auth.signInWithPopup(provider).then(cred => saveAdditionalInfoToFirebaseAndMongoDB(cred))
	}
	const signInWithGithub = () => {
		const provider = new firebase.auth.GithubAuthProvider()
		auth.signInWithPopup(provider).then(cred => saveAdditionalInfoToFirebaseAndMongoDB(cred))
	}
	
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [err, setErr] = useState(-1)
	const {register, handleSubmit, formState: {errors}} = useForm()
	const dispatch = useDispatch()
	const account = useSelector(state => state.auth)
	
	React.useEffect(() => {
		if (Object.keys(account).length !== 0) {
			history.push('/')
		}
	}, [account])
	
	const onSubmit = data => {
		axios.post('http://localhost:4000/login', data).then(res => {
			setErr(res.data)
			if (res.data.length > 1) {
				dispatch(signIn(data))
				auth.signInWithEmailAndPassword(email, password).then(cred => {
					db.collection('users').doc(cred.user.uid).update({isOnline: true}).then(() => {
						history.push("/")
					})
				})
			}
		})
	}
	
	return <>
		<CssBaseline/>
		<Header flag={true}/>
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
					<Avatar sx={{m: 1, bgcolor: "#26a69a", marginTop: "30Px"}}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5" style={headerStyle}>
						Log in to your account
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
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							{...register("password", {
								required: "Password is empty!"
							})}
							error={Boolean(errors["password"])}
							helperText={errors["password"]?.message}
							value={password}
							onInput={(e) => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{mt: 3, mb: 2, bgcolor: "#26a69a", padding: "10px"}}
						>
							Sign In
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
								severity="error"
								style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
								The password you’ve entered is incorrect.
							</Alert>
						}
						<h4 style={h4}>
							<span style={span}>Or</span>
						</h4>
						<div style={buttonsContainer}>
							<button
								onClick={signInWithGoogle}
								className="social-buttons"
								type="submit"
								style={socialButtons}
							>
								<img
									src="https://img.icons8.com/color/48/google-logo.png"
									alt=""
									style={{width: "80%"}}
								/>
							</button>
							<button
								onClick={signInWithFacebook}
								className="social-buttons"
								type="submit"
								style={socialButtons}
							>
								<img
									src="https://img.icons8.com/ios-filled/48/1778F2/facebook-new.png"
									alt=""
									style={{width: "80%"}}
								/>
							</button>
							<button
								className="social-buttons"
								type="submit"
								style={socialButtons}
							>
								<img
									src="https://img.icons8.com/color/48/000000/twitter--v1.png"
									alt=""
									style={{width: "80%"}}
								/>
							</button>
							<button
								onClick={signInWithGithub}
								className="social-buttons"
								type="submit"
								style={socialButtons}
							>
								<img
									src="https://img.icons8.com/ios-filled/50/000000/github.png"
									alt=""
									style={{width: "80%"}}
								/>
							</button>
						</div>
						<Grid container>
							<Grid item xs>
								<Link href="/forgotPassword" variant="body2" style={forgotPassword}>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Typography style={{fontSize: "14px", display: "inline"}}>
									Don't have an account?
								</Typography>
								&nbsp;{" "}
								<Link href="/signup" style={{cursor: 'pointer'}}>
									Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	</>
}
