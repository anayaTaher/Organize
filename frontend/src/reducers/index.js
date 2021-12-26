import { combineReducers } from "redux";

import auth from "./auth";
import projects from "./projects";
import contributors from "./contributors"

export const reducers = combineReducers({ auth, projects, contributors });
