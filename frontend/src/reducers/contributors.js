export default (contributors = [], actions) => {
  switch (actions.type) {
    case "FETCH_CONTRIBUTORS":
        return actions.payload;
    case "ADD_CONTRIBUTOR":
        return [...contributors.filter((contributor) => contributor._id !== actions.payload._id), actions.payload]
    case "DELETE_CONTRIBUTOR":
        return contributors.filter((contributor) => contributor._id !== actions.payload._id);
    default:
      return contributors;
  }
};
