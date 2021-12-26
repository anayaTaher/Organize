import axios from "axios";

const server = "http://localhost:4000";
export const createTask = (data) => async (dispatch) => {
    try{
        const res = await axios.post(server + "/createTask", data);
        dispatch({type: "CREATE_TASK", payload: res.data});
    }
    catch(err){
        console.log(err);
    }
}

export const fetchTasks = (data) => async (dispatch) => {
    try{
        const res = await axios.post(server + "/fetchTasks", data);
        dispatch({type: "FETCH_TASKS", payload: res.data});
    }
    catch(err){
        console.log(err);
    }
}