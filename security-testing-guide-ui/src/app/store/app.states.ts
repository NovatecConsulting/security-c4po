import * as auth from '../shared/authentication/authentication.reducers';
import * as dashboard from '../components/dashboard/dashboard.reducers';

export interface AppState {
  authState: auth.State;
  dashboardState: dashboard.State;
}
