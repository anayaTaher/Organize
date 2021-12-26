import axios from "axios"

const server = "http://localhost:4000"
export const fetchName = () => async (dispatch) => {
	try {
		const token = JSON.parse(localStorage.getItem("token"))
		const res = await axios.post("http://localhost:4000/getName", token)
		dispatch({type: "GET_EMAIL", payload: res.data.email})
	} catch (err) {
		console.log(err)
	}
}

export const signIn = (data) => async (dispatch) => {
	try {
		const res = await axios.post("http://localhost:4000/loginAuth", data)
		const token = {token: res.data.token}
		localStorage.setItem("token", JSON.stringify(token))
		dispatch({type: "LOG_IN", payload: res.data.userData})
		
		console.log(1, localStorage.getItem("token"))
		console.log(2, JSON.stringify(token))
		
	} catch (err) {
		console.log(err)
	}
}

export const getAccountData = () => async (dispatch) => {
	try {
		const token = JSON.parse(localStorage.getItem("token"))
		const res = await axios.post("http://localhost:4000/getAccountData", token)
		dispatch({type: "GET_ACCOUNT_DATA", payload: res.data})
	} catch (err) {
		console.log(err)
	}
}
