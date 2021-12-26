export default (projects = [], action) => {
  switch (action.type) {
    case "FETCH_PROJECTS":
      return action.payload;
    case "CREATE_PROJECT":
      return [...projects, action.payload];
    default:
      return projects;
  }
};
