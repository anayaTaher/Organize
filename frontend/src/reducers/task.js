export default (task = {}, action) => {
  switch (action.type) {
    case "FETCH_TASK":
      return action.payload;
    default:
      return task;
  }
};
