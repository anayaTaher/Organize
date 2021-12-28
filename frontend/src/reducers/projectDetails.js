export default (projectDetails = {}, action) => {
  switch (action.type) {
    case "FETCH_PROJECT_DETAILS":
      return action.payload;
    default:
      return projectDetails;
  }
};
