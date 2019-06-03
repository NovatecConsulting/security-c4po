import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/_list/list.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {ProjectSettingsComponent} from './component/project-settings/project-settings.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ProjectComponent} from './component/project/project.component';
import {TestFrameComponent} from './component/test/test-frame/test-frame.component';
import {OktaCallbackComponent} from '@okta/okta-angular';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'tests',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'projects/:id/settings',
    component: ProjectSettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id/:testId',
    component: TestFrameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id',
    component: ProjectComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

export const Routing = RouterModule.forRoot(appRoutes);
