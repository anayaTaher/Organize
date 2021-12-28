import axios from "axios";
import jwt from "jsonwebtoken";

const server = "http://localhost:4000";
export const createAnnouncement = (data) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = jwt.verify(token.token, "verysecret");
    console.log({ ...data, ...user });
    const res = await axios.post(server + "/createAnnouncement", {
      ...data,
      ...user,
    });
    dispatch({ type: "ADD_ANNOUNCEMENT", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const fetchAnnouncements = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/fetchAnnouncements", data);
    dispatch({ type: "FETCH_ANNOUNCEMENTS", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const likeAnnouncement = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/likeAnnouncement", data);
    dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const dislikeAnnouncement = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/dislikeAnnouncement", data);
    dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const unLikeAnnouncement = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/unLikeAnnouncement", data);
    dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const unDislikeAnnouncement = (data) => async (dispatch) => {
  try {
    const res = await axios.post(server + "/unDislikeAnnouncement", data);
    dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnnouncement = (data) => async (dispatch) => {
    try {
      const res = await axios.post(server + "/deleteAnnouncement", data);
      dispatch({ type: "DELETE_ANNOUNCEMENT", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };