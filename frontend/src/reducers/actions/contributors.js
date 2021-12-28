import axios from "axios";

const server = "http://192.168.1.242:4000";
export const addContributor = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/addContributor", data);
    if (!res.data._id) return;
    dispatch({ type: "ADD_CONTRIBUTOR", payload: {...res.data, teams: []} });
  } catch (err) {
    console.log(err);
  }
};

export const fetchContributors = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/fetchContributors", data);
    const teams = await axios.post(server + "/fetchTeams", data);
    let reversed = {};
    for(const team of teams.data){
        for(const member of team.members){
            if(!reversed[member])
                reversed[member] = [];
            reversed[member].push(team.name);
        }
    }
    let finalData = [];
    for(const user of res.data){
        finalData.push({...user, teams: reversed[user._id]});
    }
    dispatch({ type: "FETCH_CONTRIBUTORS", payload: finalData });
  } catch (err) {
    console.log(err);
  }
};

export const deleteContributor = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/deleteContributor", data);
    dispatch({ type: "DELETE_CONTRIBUTOR", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
