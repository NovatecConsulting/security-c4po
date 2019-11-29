import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';

export const loginFeatureKey = 'login';

export interface State {
  loggedIn: boolean;
  displayName: string;
}

const initialState: State = {
  loggedIn: false,
  displayName: undefined
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, state => ({
    ...state, loggedIn: true, displayName: 'Some Name'
  }))
);

export const selectLoggedIn = (state: State) => state.loggedIn;
