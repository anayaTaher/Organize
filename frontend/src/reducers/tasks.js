export default (tasks = [], action) => {
    switch(action.type){
        case "CREATE_TASK":
            return [...tasks, action.payload];
        case "REMOVE_TASK":
            return tasks.filter(task => task._id !== action.payload._id);
        case "FETCH_TASKS":
            return action.payload;
        case "UPDATE_TASK":
            const value = tasks.filter(task => task._id !== action.payload._id);
            console.log(value);
            console.log("kos emak")
            console.log(action.payload);
            return [...tasks.filter(task => task._id !== action.payload._id), action.payload];
        default:
            return tasks;
    }
}