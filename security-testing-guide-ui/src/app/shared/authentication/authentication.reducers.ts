import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from './authentication.actions';

export const loginFeatureKey = 'login';

export interface State {
  isAuthenticated: boolean;
  displayName: string;
}

const initialState: State = {
  isAuthenticated: false,
  displayName: undefined
};

export const authenticationReducers = createReducer(
  initialState,
  on(LoginActions.LOGIN, state => ({
    ...state,
    isAuthenticated: false,
    displayName: ''
  })),
  on(LoginActions.LOGIN_SUCCESS, (state, { displayName }) => ({
    ...state,
    isAuthenticated: true,
    displayName: displayName,
  }))
);

export const selectLoggedIn = (state: State) => state.isAuthenticated;
