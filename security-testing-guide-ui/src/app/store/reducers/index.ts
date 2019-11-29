import {Action, ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as fromRouter from '@ngrx/router-store';

import * as fromLogin from '../../shared/authentication/authentication.reducers';
import * as fromDashboard from '../../components/dashboard/dashboard.reducers';
import {loginFeatureKey} from '../../components/dashboard/dashboard.reducers';
import {InjectionToken} from '@angular/core';

export interface State {
  [fromLogin.loginFeatureKey]: fromLogin.State;
  [fromDashboard.loginFeatureKey]: fromDashboard.State;
  router: fromRouter.RouterReducerState<any>;
}

export const selectProjects = (state: State) => state[loginFeatureKey];
export const selectAllProjects = createSelector(
  selectProjects,
  (loginFeatureKey: fromDashboard.State, props) => {
    return loginFeatureKey;
  }
);

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root reducers token', {
  factory: () => ({
    [fromLogin.loginFeatureKey]: fromLogin.authenticationReducers,
    [fromDashboard.loginFeatureKey]: fromDashboard.dashboardReducers,
    router: fromRouter.routerReducer
  }),
});

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
