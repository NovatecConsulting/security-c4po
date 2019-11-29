import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromRouter from '@ngrx/router-store';

import * as fromLogin from './login.reducer';
import { InjectionToken } from '@angular/core';

export interface State {
  [fromLogin.loginFeatureKey]: fromLogin.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root reducers token', {
  factory: () => ({
    [fromLogin.loginFeatureKey]: fromLogin.loginReducer,
    router: fromRouter.routerReducer
  }),
});


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
