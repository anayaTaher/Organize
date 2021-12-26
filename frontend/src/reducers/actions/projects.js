import axios from "axios"
import jwt from "jsonwebtoken"

const server = "http://localhost:4000"

export const createProject = (data) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token")).token
    const {id} = jwt.verify(token, "verysecret")
    data = {...data, owner: id}
    const res = await axios.post(server + "/createProject", data)
    dispatch({type: "CREATE_PROJECT", payload: res.data})
    console.log("dispatched")
  } catch (err) {
    console.log(err)
  }
}

export const fetchProjects = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token")).token
    const account = jwt.verify(token, "verysecret")
    console.log(account)
    const res = await axios.post(server + "/fetchProjects", account)
    dispatch({type: "FETCH_PROJECTS", payload: res.data})
  } catch (err) {
    console.log(err)
  }
}
