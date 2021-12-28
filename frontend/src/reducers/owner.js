export default (owner = false, action) => {
  switch (action.type) {
    case "IS_OWNER":
      return action.payload.owner;
    default:
      return owner;
  }
};
