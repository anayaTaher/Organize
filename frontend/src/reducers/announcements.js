const sortByDate = (a, b) => {
    const dateA = new Date(Date.parse(a.date));
    const dateB = new Date(Date.parse(b.date));
    return dateB.getTime() - dateA.getTime();
}

export default (announcements = [], action) => {
  switch (action.type) {
    case "ADD_ANNOUNCEMENT":
      return [...announcements, action.payload].sort(sortByDate);
    case "FETCH_ANNOUNCEMENTS":
      return action.payload.sort(sortByDate);
    case "UPDATE_ANNOUNCEMENT":
        return [...announcements.filter(annoucement => annoucement._id !== action.payload._id), action.payload].sort(sortByDate);
    case "DELETE_ANNOUNCEMENT":
        console.log(action.payload)
        return announcements.filter(annoucement => annoucement._id !== action.payload).sort(sortByDate);
    default:
      return announcements;
  }
};
