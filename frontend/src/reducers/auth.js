export default (auth = {}, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.payload;
    case "LOG_OUT":
      localStorage.clear();
      return {};
    case "GET_ACCOUNT_DATA":
      return action.payload;
    default:
      return auth;
  }
};
