export default (projectMembers = [], action) => {
    switch (action.type) {
      case "FETCH_PROJECT_MEMBERS":
        return action.payload;
      default:
        return projectMembers;
    }
  };
  