import React from "react"
import Navbar from "./dashboard.navbar"
import AnnouncementsImp from "./dashboard.announcements.imp"
import {Box} from "@mui/system"

const Announcement = () => {
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const HandleMobileClose = () => setMobileOpen(!mobileOpen)
	return (
		<>
			<Box component="div" sx={{display: "flex"}}>
				<Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose}/>
				<AnnouncementsImp/>
			</Box>
		</>
	)
}

export default Announcement
