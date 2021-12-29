export default (team = {}, action) => {
  switch (action.type) {
    case "FETCH_TEAM":
      return action.payload;
    default:
      return team;
  }
};
