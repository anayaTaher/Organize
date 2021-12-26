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
import Schedule from "./components/dashboard.schedule"
import Tasks from "./components/dashboard.tasks"
import Contributors from "./components/dashboard.contributors"
import NewTask from "./components/dashboard.newTask"
import Announcements from "./components/dashboard.announcements"
import NewTeam from "./components/dashboard.newTeam"

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
	return <>
		<ThemeProvider theme={mainTheme}>
			<AuthProvider>
				<BrowserRouter>
					<CssBaseline/>
					<Switch>
						<Route exact path="/" component={Homepage}/>
						<Route path="/contactus" component={ContactUs}/>
						<PrivateRoute toLogin={false} path="/login" component={Login}/>
						<PrivateRoute toLogin={false} path="/signup" component={SignUp}/>
						<PrivateRoute toLogin={false} path="/forgotPassword" component={ForgotPassword}/>
						<PrivateRoute toLogin={false} path="/reset-password/:id/:token" component={ResetPassword}/>
						<PrivateRoute toLogin={true} path="/chat-room" component={ChatRoom}/>
						<PrivateRoute toLogin={true} path="/projects/:id/announcements" component={Announcements}/>
						<PrivateRoute toLogin={true} path="/projects/:id/tasks" component={Tasks}/>
						<PrivateRoute toLogin={true} path="/projects/:id/contributors" component={Contributors}/>
						<PrivateRoute toLogin={true} path="/projects/:id/newTask" component={NewTask}/>
						<PrivateRoute toLogin={true} path="/projects/:id/newTeam" component={NewTeam}/>
						<PrivateRoute toLogin={true} path="/projects/:id" component={Schedule}/>
						<PrivateRoute toLogin={true} path="/projects/" component={Projects}/>
					</Switch>
				</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	</>
}

export default App
