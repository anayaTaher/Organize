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