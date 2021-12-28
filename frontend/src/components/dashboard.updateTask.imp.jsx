import React from "react"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import {Box, Button, Checkbox, Grid, IconButton, TextField, Tooltip, Typography} from "@mui/material"
import {CalendarPicker, LocalizationProvider} from "@mui/lab"
import AddIcon from "@mui/icons-material/Add"
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt"
import ClearIcon from "@mui/icons-material/Clear"
import DeleteIcon from "@mui/icons-material/Delete"
import {green, red} from "@mui/material/colors"
import {useDispatch, useSelector} from "react-redux"
import {fetchTasks, updateTask} from "../reducers/actions/tasks"
import {useHistory, useParams} from "react-router-dom"
import {fetchTeams} from "../reducers/actions/teams"

function Subtitle({number, title, mt = 0}) {
	return (
		<Box sx={{display: "flex", alignItems: "center", p: 2, pt: 4, mt}}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "50px",
					width: "50px",
					backgroundColor: "lightgray",
					color: "white",
					borderRadius: "50%",
					mr: 2
				}}
			>
				<Typography variant="h4">{number}</Typography>
			</Box>
			<Typography variant="h5">{title}</Typography>
		</Box>
	)
}

function UpdateTaskImp() {
	const dispatch = useDispatch()
	const params = useParams()
	const teams = useSelector((state) => state.teams)
	const tasks = useSelector((state) => state.tasks)
	const history = useHistory()
	const today = new Date()
	const [currentTask, setCurrentTask] = React.useState()
	const [checkedTeams, setCheckedTeams] = React.useState([])
	const [checkedTasks, setCheckedTasks] = React.useState([])
	const [taskData, setTaskData] = React.useState({
		taskName: "",
		taskDescription: "",
		taskWeight: 0,
		taskDeadline: new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate()
		),
		taskStartDate: new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate()
		)
	})
	
	const [subtaskData, setSubtaskData] = React.useState({
		id: 0, //local id for now
		subtaskName: "",
		subtaskWeight: 0
	})
	
	const [subtasks, setSubtasks] = React.useState([])
	
	React.useEffect(() => {
		dispatch(fetchTeams({projectId: params.id}))
		dispatch(fetchTasks({projectId: params.id}))
	}, [dispatch])
	
	React.useEffect(() => {
		const [x, ..._] = tasks.filter((task) => task._id === params.tid)
		setCurrentTask(x)
	}, [tasks])
	
	React.useEffect(() => {
		if (!currentTask) {
			return
		}
		setTaskData({
			taskName: currentTask.name,
			taskDescription: currentTask.description,
			taskWeight: currentTask.weight,
			taskDeadline: new Date(Date.parse(currentTask.deadline)),
			taskStartDate: new Date(Date.parse(currentTask.startDate))
		})
		let subtasks = []
		currentTask.subtasks.forEach((subtask) => {
			subtasks.push({
				...subtask,
				id: subtask._id,
				subtaskName: subtask.name,
				subtaskWeight: subtask.weight
			})
		})
		setSubtasks(subtasks)
		setCheckedTeams(
			teams.map((team) => ({
				...team,
				isChecked: currentTask.teams.includes(team._id)
			}))
		)
		setCheckedTasks(
			tasks
				.map((task) => ({
					...task,
					isChecked: currentTask.dependsOn.includes(task._id)
				}))
				.filter((task) => task._id !== currentTask._id)
		)
	}, [currentTask])
	
	const handleUpdateTask = () => {
		const updatedSubTasks = subtasks.map((subtask) => {
			if (!subtask._id) {
				return {
					name: subtask.subtaskName,
					weight: subtask.subtaskWeight,
					inProgress: false,
					done: false,
					worker: "0",
					finisher: "0"
				}
			} else {
				return {
					_id: subtask._id,
					name: subtask.subtaskName,
					weight: subtask.subtaskWeight,
					inProgress: subtask.inProgress,
					done: subtask.done,
					worker: subtask.worker,
					finisher: subtask.finisher
				}
			}
		})
		const updatedTask = {
			_id: params.tid,
			projectId: params.id,
			name: taskData.taskName,
			description: taskData.taskDescription,
			weight: taskData.taskWeight,
			startDate: taskData.taskStartDate,
			deadline: taskData.taskDeadline,
			subtasks: updatedSubTasks,
			teams: checkedTeams.filter((team) => {
				if (team.isChecked) {
					return team._id
				}
			}),
			dependsOn: checkedTasks.filter((task) => {
				if (task.isChecked) {
					return task._id
				}
			}),
			done: currentTask.done
		}
		dispatch(updateTask(updatedTask))
		history.push(`/projects/${params.id}/tasks`)
	}
	
	const handleSubtaskDataChange = (field) => (event) => {
		if (field === "subtaskWeight") {
			const reducer = (previousValue, currentValue) =>
				previousValue + currentValue.subtaskWeight
			const weightSummation = subtasks.reduce(reducer, 0)
			let value = Number(event.target.value)
			if (value + weightSummation > taskData.taskWeight) {
				value = taskData.taskWeight - weightSummation
			}
			setSubtaskData({
				...subtaskData,
				[field]: value
			})
			return
		}
		setSubtaskData({...subtaskData, [field]: event.target.value})
	}
	
	const handleNewTaskDataChange = (field) => (event) => {
		if (field === "taskDeadline" || field === "taskStartDate") {
			const realDate = new Date(
				event.getFullYear(),
				event.getMonth(),
				event.getDate()
			)
			setTaskData({...taskData, [field]: realDate}) //event is the new date value
			return
		}
		if (field === "taskWeight") {
			setTaskData({...taskData, [field]: Number(event.target.value)})
			return
		}
		setTaskData({...taskData, [field]: event.target.value})
	}
	
	const clearSubtaskFields = () => {
		setSubtaskData({
			...subtaskData,
			subtaskName: "",
			subtaskWeight: 0
		})
	}
	
	const addSubtask = () => {
		if (subtaskData.subtaskName !== "") {
			const newSubTask = {
				id: subtaskData.id,
				subtaskName: subtaskData.subtaskName,
				subtaskWeight: subtaskData.subtaskWeight
			}
			setSubtaskData({...subtaskData, id: subtaskData.id + 1}) // local id for now
			setSubtasks([...subtasks, newSubTask])
		}
		clearSubtaskFields()
	}
	
	const removeSubtask = (id) => () => {
		setSubtasks(
			subtasks.filter((subtask) => {
				return subtask.id !== id
			})
		)
	}
	
	const handleTeamCheckChange = (id) => () => {
		setCheckedTeams(
			checkedTeams.map((team) =>
				team._id === id ? {...team, isChecked: !team.isChecked} : team
			)
		)
	}
	
	const handleTaskCheckChange = (id) => () => {
		setCheckedTasks(
			checkedTasks.map((task) =>
				task._id === id ? {...task, isChecked: !task.isChecked} : task
			)
		)
	}
	
	return (
		<Box
			sx={{display: "flex", flexDirection: "column", width: "100%"}}
			component="form"
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					p: 2,
					"& > *": {
						mr: 2
					},
					borderBottom: 1,
					borderColor: "lightgray",
					width: "100%"
				}}
			>
				<SystemUpdateAltIcon fontSize="large"/>
				<Typography variant="h5" sx={{flexGrow: 1}}>
					Update {currentTask?.name} Task
				</Typography>
			</Box>
			<Subtitle number={1} title={"Task Details"}/>
			<Grid container padding={2} rowGap={2} sx={{"& > *": {px: 1}}}>
				<Grid
					item
					container
					flexDirection="row-reverse"
					alignItems="center"
					xs={2}
				>
					<Typography variant="body1">Task Name</Typography>
				</Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						label="Task Name"
						fullWidth
						value={taskData.taskName}
						onChange={handleNewTaskDataChange("taskName")}
						required
					/>
				</Grid>
				<Grid item container xs={4} alignItems="center" justifyContent="center">
					<Typography variant="body1">Task Start Date</Typography>
				</Grid>
				<Grid
					item
					container
					flexDirection="row-reverse"
					alignItems="center"
					xs={2}
				>
					<Typography variant="body1">Task Description</Typography>
				</Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						label="Task Description"
						value={taskData.taskDescription}
						onChange={handleNewTaskDataChange("taskDescription")}
						multiline
						fullWidth
						rows={15}
					/>
				</Grid>
				<Grid item xs={4}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<CalendarPicker
							date={taskData.taskStartDate}
							onChange={handleNewTaskDataChange("taskStartDate")}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid
					item
					container
					flexDirection="row-reverse"
					alignItems="center"
					xs={2}
				>
					<Typography variant="body1">Task Weight</Typography>
				</Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						label="Task Weight"
						value={taskData.taskWeight}
						onChange={handleNewTaskDataChange("taskWeight")}
						type="number"
						fullWidth
						required
						InputLabelProps={{
							shrink: true
						}}
					/>
				</Grid>
				<Grid item container xs={4} alignItems="center" justifyContent="center">
					<Typography variant="body1">Task Deadline</Typography>
				</Grid>
				<Grid xs={2}/>
				<Grid
					item
					xs={6}
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center"
					}}
				>
					<Typography variant="h6">Info:</Typography>
					<Typography>Task Name: Minimal info about the task.</Typography>
					<Typography>
						Task Description: Everything that has to be explained about the
						task.
					</Typography>
					<Typography>
						Task Weight: Estimiation about the difficulty of the task.
					</Typography>
					<Typography>
						Task Start Date: The start date to being working on the task.
					</Typography>
					<Typography>
						Task Deadline: The last date to handle the task.
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<CalendarPicker
							date={taskData.taskDeadline}
							onChange={handleNewTaskDataChange("taskDeadline")}
						/>
					</LocalizationProvider>
				</Grid>
			</Grid>
			<Subtitle number={2} title={"Sub Tasks"} mt={4}/>
			<Grid container padding={2} rowGap={2} sx={{"& > *": {px: 1}}}>
				<Grid
					item
					container
					flexDirection="row-reverse"
					alignItems="center"
					xs={2}
				>
					<Typography variant="body1">Subtask Name</Typography>
				</Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						label="Subtask Name"
						fullWidth
						value={subtaskData.subtaskName}
						onChange={handleSubtaskDataChange("subtaskName")}
						required
					/>
				</Grid>
				<Grid item container alignItems="center" xs={4}>
					<Box>
						<Tooltip title="Add Subtask">
							<IconButton onClick={addSubtask}>
								<AddIcon sx={{color: green[500]}}/>
							</IconButton>
						</Tooltip>
						<Tooltip title="Clear Subtask Fields">
							<IconButton onClick={clearSubtaskFields}>
								<ClearIcon sx={{color: red[500]}}/>
							</IconButton>
						</Tooltip>
					</Box>
				</Grid>
				<Grid
					item
					container
					flexDirection="row-reverse"
					alignItems="center"
					xs={2}
				>
					<Typography variant="body1">Subtask Weight</Typography>
				</Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						label="Subtask Weight"
						fullWidth
						value={subtaskData.subtaskWeight}
						onChange={handleSubtaskDataChange("subtaskWeight")}
						required
						type="number"
						helperText="The summation of all subtask weights must be equal to the overall task weight."
					/>
				</Grid>
				<Grid item xs={4}/>
				<Grid
					item
					container
					flexDirection="row-reverse"
					alignItems="center"
					xs={2}
				>
					<Typography variant="body1">Added Subtasks</Typography>
				</Grid>
				<Grid item container xs={6}>
					<Grid
						container
						sx={{border: 1, borderColor: "lightgray", borderRadius: 1, p: 2}}
					>
						<Grid item container xs={12}>
							<Grid item container justifyContent="center" xs={6}>
								<Typography variant="body1" fontWeight={700}>
									Subtask Name
								</Typography>
							</Grid>
							<Grid item container justifyContent="center" xs={4}>
								<Typography variant="body1" fontWeight={700}>
									Subtask Weight
								</Typography>
							</Grid>
							<Grid item container justifyContent="center" xs={2}>
								<Typography variant="body1" fontWeight={700}>
									Subtask Options
								</Typography>
							</Grid>
						</Grid>
						<Grid container alignItems="center" paddingTop={2}>
							{subtasks.map((subtask) => {
								return (
									<>
										<Grid item xs={6}>
											<Typography variant="body1">
												{subtask.subtaskName}
											</Typography>
										</Grid>
										<Grid item container justifyContent="center" xs={4}>
											<Typography variant="body1" sx={{color: "#708090"}}>
												{subtask.subtaskWeight}
											</Typography>
										</Grid>
										<Grid item container justifyContent="center" xs={2}>
											<IconButton onClick={removeSubtask(subtask.id)}>
												<DeleteIcon sx={{color: red[500]}}/>
											</IconButton>
										</Grid>
									</>
								)
							})}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Subtitle number={3} title={"Assign Teams"} mt={4}/>
			<Grid container padding={2} rowGap={2} sx={{"& > *": {px: 1}}}>
				<Grid
					item
					container
					flexDirection="row-reverse"
					alignItems="center"
					xs={2}
				>
					<Typography variant="body1">Available Teams</Typography>
				</Grid>
				<Grid item container xs={6}>
					<Grid
						container
						sx={{border: 1, borderColor: "lightgray", borderRadius: 1, p: 2}}
					>
						<Grid item container xs={12}>
							<Grid item container justifyContent="center" xs={10}>
								<Typography variant="body1" fontWeight={700}>
									Team Name
								</Typography>
							</Grid>
							<Grid item container justifyContent="center" xs={2}>
								<Typography variant="body1" fontWeight={700}>
									Add Team
								</Typography>
							</Grid>
						</Grid>
						<Grid container alignItems="center" paddingTop={2}>
							{checkedTeams.map((team) => {
								return (
									<>
										<Grid item xs={10}>
											<Typography variant="body1">{team.name}</Typography>
										</Grid>
										<Grid item container justifyContent="center" xs={2}>
											<Checkbox
												checked={team.isChecked}
												onChange={handleTeamCheckChange(team._id)}
											/>
										</Grid>
									</>
								)
							})}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Subtitle number={4} title={"Task Dependency"} mt={4}/>
			<Grid container padding={2} rowGap={2} sx={{"& > *": {px: 1}}}>
				<Grid
					item
					container
					flexDirection="row-reverse"
					alignItems="center"
					xs={2}
				>
					<Typography variant="body1">Available Task</Typography>
				</Grid>
				<Grid item container xs={6}>
					<Grid
						container
						sx={{border: 1, borderColor: "lightgray", borderRadius: 1, p: 2}}
					>
						<Grid item container xs={12}>
							<Grid item container justifyContent="center" xs={10}>
								<Typography variant="body1" fontWeight={700}>
									Task Name
								</Typography>
							</Grid>
							<Grid item container justifyContent="center" xs={2}>
								<Typography variant="body1" fontWeight={700}>
									Depends On
								</Typography>
							</Grid>
						</Grid>
						<Grid container alignItems="center" paddingTop={2}>
							{checkedTasks.map((task) => {
								return (
									<>
										<Grid item xs={10}>
											<Typography variant="body1">{task.name}</Typography>
										</Grid>
										<Grid item container justifyContent="center" xs={2}>
											<Checkbox
												checked={task.isChecked}
												onChange={handleTaskCheckChange(task._id)}
											/>
										</Grid>
									</>
								)
							})}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Box>
				<Grid container padding={2}>
					<Grid item container flexDirection="row-reverse" xs={8}>
						<Button size="large" variant="contained" onClick={handleUpdateTask}>
							Update Task
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export default UpdateTaskImp;
