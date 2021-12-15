import React from "react"
import Projects from "./components/projects"
import ContactUs from "./components/ContactUs"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import {BrowserRouter, Route} from "react-router-dom"
import Homepage from "./components/homepage"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material/styles"
import {teal} from "@mui/material/colors"
import Switch from "react-router-dom/es/Switch"

let mainTheme = createTheme({
	typography: {fontFamily: "Roboto"},
	palette: {
		primary: {
			main: teal[400]
		}
	}
})

mainTheme = responsiveFontSizes(mainTheme)

function App() {
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const HandleMobileClose = () => setMobileOpen(!mobileOpen)
	
	return (
		<>
			<ThemeProvider theme={mainTheme}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Homepage}/>
						<Route path="/projects/" component={Projects}/>
						<Route path="/login" component={Login}/>
						<Route path="/signup" component={SignUp}/>
						<Route path="/contactus" component={ContactUs}/>
						<Route path="/forgotPassword" component={ForgotPassword}/>
						<Route path="/reset-password/:id/:token" component={ResetPassword}/>
					</Switch>
				</BrowserRouter>
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
	)
}

export default App
