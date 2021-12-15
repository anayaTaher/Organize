import React from 'react'
import Login from "./Login"
import SignUp from "./SignUp"
import {Route, Routes} from "react-router-dom"
import ForgotPassword from "./ForgotPassword"
import ResetPassword from "./ResetPassword"

const App = () => {
	
	return <>
		<Routes>
			<Route path="signup" element={<SignUp/>}/>
			<Route path="login" element={<Login/>}/>
			<Route path="forgotPassword" element={<ForgotPassword/>}/>
			<Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
		</Routes>
	</>
}

export default App
