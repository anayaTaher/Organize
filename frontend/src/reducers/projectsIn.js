export default (projectsIn = [], action) => {
  switch (action.type) {
    case "FETCH_PROJECTS_IN":
      return action.payload;
    default:
      return projectsIn;
  }
};
