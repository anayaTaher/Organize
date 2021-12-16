import React from "react"

import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {Button, CssBaseline} from "@mui/material"

export default function ContactUs() {
	return (
		<>
			<CssBaseline/>
			<Button
				variant="contained"
				onClick={() => toast("This Is Contact Us Page")}
			>
				Click Me
			</Button>
			<ToastContainer/>
		</>
	)
}
