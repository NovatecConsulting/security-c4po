import {Project} from "../../models/project";
import {createReducer, on} from "@ngrx/store";
import * as DashboardActions from '../dashboard/dashboard.actions';

export const loginFeatureKey = 'dashboard';

export interface State {
  isLoading: boolean;
  projects: Project[];
}

const initialState: State = {
  isLoading: false,
  projects: []
};

export const dashboardReducers = createReducer(
  initialState,
  on(DashboardActions.GET_PROJECTS, state => ({
    ...state,
    isLoading: true
  })),
  on(DashboardActions.GET_PROJECTS_SUCCESS, (state, { projects }) => ({
    ...state,
    isLoading: false,
    projects: projects
  }))
);
