import React, {useContext} from "react"
import {
	Avatar,
	Divider,
	Drawer,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Tooltip
} from "@mui/material"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import ToolBar from "@mui/material/Toolbar"
import Logo from "../assets/logo/logo.png"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import ProjectsIcon from "@mui/icons-material/Task"
import ContactUsIcon from "@mui/icons-material/Phone"
import PersonAdd from "@mui/icons-material/PersonAdd"
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import {auth, db} from "../firebase"
import {AuthContext} from "./auth"
import {useHistory} from "react-router-dom"

const HeaderTheme = createTheme({
	palette: {
		primary: {
			main: "#708090"
		}
	}
})

function Header() {
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const HandleMobileClose = () => setMobileOpen(!mobileOpen)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)
	const history = useHistory()
	const logout = async () => {
		await db.collection('users').doc(auth.currentUser.uid).update({isOnline: false})
		await auth.signOut()
		history.push("/chat-room")
	}
	const {user} = useContext(AuthContext)
	
	return (
		<ThemeProvider theme={HeaderTheme}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#FFF",
					boxShadow: 0
				}}
			>
				<ToolBar>
					<ToolBar sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
						<Avatar
							src={Logo}
							alt="/o/"
							sx={{mr: 5, height: 50, width: 50}}
						/>
						<Link
							href="/"
							underline="none"
							variant="h6"
							sx={{mr: 5, fontWeight: 500}}
						>
							Home
						</Link>
						{user && <Link
							href="/projects"
							underline="none"
							variant="h6"
							sx={{mr: 5, fontWeight: 500}}
						>
							Projects
						</Link>}
						<Link
							href="/contactus"
							underline="none"
							variant="h6"
							sx={{mr: 5, fontWeight: 500}}
						>
							Contact Us
						</Link>
						{user && <Link
							href="/chat-room"
							underline="none"
							variant="h6"
							sx={{mr: 5, fontWeight: 500}}
						>
							Chat Room
						</Link>}
						{user && <Link
							onClick={() => window.location.href = "http://localhost:4000/"}
							href="#"
							underline="none"
							variant="h6"
							sx={{mr: 5, fontWeight: 500}}
						>
							Video Calling
						</Link>}
					</ToolBar>
					<ToolBar sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
						<IconButton sx={{mr: 2}} onClick={HandleMobileClose}>
							<MenuIcon/>
						</IconButton>
						<Avatar
							src={Logo}
							alt="/o/"
							sx={{mr: 5, height: 50, width: 50}}
						/>
					</ToolBar>
					<ToolBar sx={{justifyContent: "flex-end"}}>
						<Tooltip title="Account settings">
							<IconButton onClick={handleClick}>
								<Avatar src={Logo} alt="/o/"/>
							</IconButton>
						</Tooltip>
					</ToolBar>
				</ToolBar>
			</AppBar>
			<Drawer
				variant="temporary"
				anchor="top"
				sx={{
					display: {xs: "block", md: "none"}
				}}
				open={mobileOpen}
				onClose={HandleMobileClose}
			>
				<List>
					<Link href="/" color="#000000" underline="none">
						<ListItem>
							<ListItemButton>
								<HomeIcon sx={{mr: 1}}/>
								Home
							</ListItemButton>
						</ListItem>
					</Link>
					<Divider/>
					<Link href="/projects" color="#000000" underline="none">
						<ListItem>
							<ListItemButton>
								<ProjectsIcon sx={{mr: 1}}/>
								Projects
							</ListItemButton>
						</ListItem>
					</Link>
					<Divider/>
					<Link href="/contactus" color="#000000" underline="none">
						<ListItem>
							<ListItemButton>
								<ContactUsIcon sx={{mr: 1}}/>
								Contact Us
							</ListItemButton>
						</ListItem>
					</Link>
				</List>
			</Drawer>
			{(user !== null) && <Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 23,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0
						}
					}
				}}
				transformOrigin={{horizontal: "right", vertical: "top"}}
				anchorOrigin={{horizontal: "right", vertical: "bottom"}}
			>
				<MenuItem>
					<Avatar/> Profile
				</MenuItem>
				<MenuItem>
					<Avatar/> My Account
				</MenuItem>
				<Divider/>
				<MenuItem>
					<ListItemIcon>
						<PersonAdd fontSize="small"/>
					</ListItemIcon>
					Add Another Account
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize="small"/>
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={logout}>
					<ListItemIcon>
						<Logout fontSize="small"/>
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>}
		</ThemeProvider>
	)
}

export default Header
