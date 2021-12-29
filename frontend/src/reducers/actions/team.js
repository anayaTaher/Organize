import axios from "axios";

const server = "http://localhost:4000"
export const fetchTeam = (data) => async (dispatch) => {
    try{
        const res = await axios.post(server + '/fetchTeam', data);
        dispatch({type: "FETCH_TEAM", payload: res.data});
    }
    catch(err){
        console.log(err);
    }
}