export default (projectOwner = {}, action) => {
    switch(action.type){
        case "GET_PROJECT_OWNER":
            return action.payload;
        default:
            return projectOwner;
    }
}