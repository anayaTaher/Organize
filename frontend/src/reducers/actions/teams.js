import axios from "axios"

const server = "http://localhost:4000";
export const addTeam = async (data) => {
    try{
        const res = await axios.post(server + "/addTeam", data);
        return res.status;
    }
    catch(err){
        console.log(err);
    }
}

export const fetchTeams = (data) => async (dispatch) => {
    try{
        const res = await axios.post(server + "/fetchTeams", data);
        dispatch({type: "FETCH_TEAMS", payload: res.data});
    }
    catch(err){
        console.log(err);
    }
}

export const editTeam = async (data) => {
    try{
        const res = await axios.post(server + "/editTeam", data);
        return res.status;
    }
    catch(err){
        console.log(err);
    }
}
