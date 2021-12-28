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
  } catch (err) {
    console.log(err)
  }
}

export const fetchProjects = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token")).token
    const account = jwt.verify(token, "verysecret")
    const res = await axios.post(server + "/fetchProjects", account)
    dispatch({type: "FETCH_PROJECTS", payload: res.data})
  } catch (err) {
    console.log(err)
  }
}

export const fetchProjectsIn = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token")).token
    const account = jwt.verify(token, "verysecret")
    const res = await axios.post(server + "/fetchProjectsIn", account);
    dispatch({type: "FETCH_PROJECTS_IN", payload: res.data})
  } catch (err) {
    console.log(err)
  }
}

export const isProjectOwner = (data) => async (dispatch) => {
  try{
    const token = JSON.parse(localStorage.getItem("token")).token
    const account = jwt.verify(token, "verysecret")
    const res = await axios.post(server + "/isOwner", {...data, account});
    dispatch({type: "IS_OWNER", payload: res.data})
  }
  catch(err){
    console.log(err);
  }
}

export const getProjectDetails = (data) => async (dispatch) => {
  try{
    const res = await axios.post(server + "/getProjectDetails", data);
    dispatch({type: "FETCH_PROJECT_DETAILS", payload: res.data})
  }
  catch(err){
    console.log(err);
  }
}

export const getProjectOwner = (data) => async (dispatch) => {
  try{
    const res = await axios.post(server + "/getProjectOwner", data);
    dispatch({type: "GET_PROJECT_OWNER", payload: res.data})
  }
  catch(err){
    console.log(err);
  }
}
