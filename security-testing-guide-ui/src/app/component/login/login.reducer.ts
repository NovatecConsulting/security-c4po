import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export interface State {
  loggedIn: boolean;
  displayName: string;
}

export const initialState: State = {
  loggedIn: false,
  displayName: null
};

const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, state => ({
    ...state, loggedIn: true, displayName: 'Some Name'
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
}
