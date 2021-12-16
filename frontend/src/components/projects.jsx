import React from "react"
import ProjectsMain from "./projects.main"
import {CssBaseline} from "@mui/material"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import Footer from "./footer"

let mainTheme = createTheme({
	typography: {fontFamily: "Roboto"},
	palette: {
		primary: {
			main: "#20b2aa"
		}
	}
})

function Projects() {
	return (
		<>
			<ThemeProvider theme={mainTheme}>
				<CssBaseline/>
				<ProjectsMain/>
				<Footer/>
			</ThemeProvider>
		</>
	)
}

export default Projects
