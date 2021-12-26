import { combineReducers } from "redux";

import auth from "./auth";
import projects from "./projects";
import contributors from "./contributors";
import tasks from "./tasks";
import teams from "./teams";

export const reducers = combineReducers({ auth, projects, contributors, tasks, teams });
