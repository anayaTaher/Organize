import React from "react"
import {Avatar, Box, CardActionArea, CardContent, Typography} from "@mui/material"
import Facebook from "./../assets/images/fb.png"

function ProjectCard() {
	return (
		<>
			<Box
				sx={{
					color: "lightseagreen",
					border: 1,
					width: "100%",
					height: 400
				}}
			>
				<CardActionArea
					sx={{
						height: "100%",
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "black"
					}}
				>
					<CardContent>
						<Box
							sx={{
								flexDirection: "column",
								alignItems: "center"
							}}
						>
							<Avatar src={Facebook} sx={{height: 150, width: 150, mb: 5}}/>
							<Typography variant="h6" textAlign="center">Facebook</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Box>
		</>
	)
}

export default ProjectCard
