import axios from "axios";
import jwt from "jsonwebtoken"

const server = "http://192.168.1.242:4000";
export const fetchTask = (data) => async (dispatch) => {
    try{
        const res = await axios.post(server + '/fetchTask', data);
        dispatch({type: "FETCH_TASK", payload: res.data});
    }
    catch(err){
        console.log(err);
    }
}
