import { combineReducers } from "redux";

import auth from "./auth";
import projects from "./projects";
import contributors from "./contributors";
import tasks from "./tasks";
import teams from "./teams";
import task from "./task"
import projectsIn from "./projectsIn"
import owner from "./owner"
import projectDetails from "./projectDetails"

export const reducers = combineReducers({ auth, projects, contributors, tasks, teams, task, projectsIn, owner, projectDetails });
