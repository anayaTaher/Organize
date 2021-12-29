import axios from "axios";
import jwt from "jsonwebtoken";

const server = "http://localhost:4000"
export const createTask = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/createTask", data);
    dispatch({ type: "CREATE_TASK", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const fetchTasks = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/fetchTasks", data);
    dispatch({ type: "FETCH_TASKS", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const removeTask = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/removeTask", data);
    dispatch({ type: "REMOVE_TASK", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateProgress = (data) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = jwt.verify(token.token, "verysecret");
    const res = await axios.post(server + "/updateProgress", { ...data, user });
    dispatch({ type: "UPDATE_TASK", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateDone = (data) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = jwt.verify(token.token, "verysecret");
    const res = await axios.post(server + "/updateDone", { ...data, user });
    dispatch({ type: "UPDATE_TASK", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const toggleTaskDone = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/toggleTaskDone", data);
    dispatch({ type: "UPDATE_TASK", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (data) => async (dispatch) => {
  try{
    const res = await axios.post(server + "/updateTask", data);
    dispatch({type: "UPDATE_TASK", payload: res.data});
  }
  catch(err){
    console.log(err);
  }
}
