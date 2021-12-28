import axios from "axios"

const server = "http://192.168.1.242:4000";
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
