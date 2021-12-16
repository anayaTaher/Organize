import React from "react"
import Projects from "./components/projects"
import ContactUs from "./components/ContactUs"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Homepage from "./components/homepage"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material/styles"
import {teal} from "@mui/material/colors"
import Header from "./components/header"
import {CssBaseline} from "@mui/material"
import ChatRoom from "./components/ChatRoom"
import AuthProvider from "./components/auth"
import PrivateRoute from "./components/PrivateRoute"
import "./App.css"

let mainTheme = createTheme({
	typography: {fontFamily: "Roboto"},
	palette: {
		primary: {
			main: teal[400]
		}
	}
})

mainTheme = responsiveFontSizes(mainTheme)

const App = () => {
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const HandleMobileClose = () => setMobileOpen(!mobileOpen)
	
	return <>
		<ThemeProvider theme={mainTheme}>
			<AuthProvider>
				<BrowserRouter>
					<Header/>
					<CssBaseline/>
					<Switch>
						<Route exact path="/" component={Homepage}/>
						<Route path="/contactus" component={ContactUs}/>
						<PrivateRoute toLogin={false} path="/login" component={Login}/>
						<PrivateRoute toLogin={false} path="/signup" component={SignUp}/>
						<PrivateRoute toLogin={false} path="/forgotPassword" component={ForgotPassword}/>
						<PrivateRoute toLogin={false} path="/reset-password/:id/:token" component={ResetPassword}/>
						<PrivateRoute toLogin={true} path="/projects/" component={Projects}/>
						<PrivateRoute toLogin={true} path="/chat-room" component={ChatRoom}/>
					</Switch>
				</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
		{/* <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Header HandleMobileClose={HandleMobileClose} />
        <Box component="div" sx={{ display: "flex" }}>
          <Navbar
            mobileOpen={mobileOpen}
            HandleMobileClose={HandleMobileClose}
          />
          <Schedule />
        </Box> */}
		{/* <MainHeader />
        <Banner />
        <Box sx={{ m: 2, p: 5 }}>
          <Cards />
        </Box>
        <Box sx={{ m: 2, p: 5 }}>
          <Cards />
        </Box>
        <Projects/>
        <Footer/> */}
		{/* </ThemeProvider> */}
		
		{/* <Contributors/> */}
		{/*
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <NewTask />
        <Tasks/>
        <Announcements />
      </ThemeProvider> */}
	</>
}

export default App
