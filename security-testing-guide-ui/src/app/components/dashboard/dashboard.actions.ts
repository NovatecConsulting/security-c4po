import {createAction, props} from "@ngrx/store";
import {Project} from "../../models/project";

export const GET_PROJECTS = createAction('[Dashboard] Get All Projects');
export const GET_PROJECTS_SUCCESS = createAction('[Dashboard] Get All Projects Success', props<{ projects: Project[] }>());
