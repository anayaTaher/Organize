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
import announcements from "./announcements"
import projectOwner from "./projectOwner";
import team from "./team"

export const reducers = combineReducers({ auth, projects, contributors, tasks, teams, task, projectsIn, owner, projectDetails, announcements, projectOwner, team });
