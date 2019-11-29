import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './components/_list/list.component';
import {LoginComponent} from './components/login/login.component';
import {ProjectSettingsComponent} from './components/project-settings/project-settings.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProjectComponent} from './components/project/project.component';
import {TestFrameComponent} from './components/test/test-frame/test-frame.component';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {AuthGuard} from './guards/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'tests',
    component: ListComponent,
    canActivate: [AuthGuard],
    // canActivate: [OktaAuthGuard],
    data: {
      onAuthRequired
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'projects/:id/settings',
    component: ProjectSettingsComponent,
    canActivate: [AuthGuard],
    // canActivate: [OktaAuthGuard],
    data: {
      onAuthRequired
    }
  },
  {
    path: 'projects/:id/:testId',
    component: TestFrameComponent,
    canActivate: [AuthGuard],
    // canActivate: [OktaAuthGuard],
    data: {
      onAuthRequired
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [OktaAuthGuard],
    canActivate: [AuthGuard],
    data: {
      onAuthRequired
    }
  },
  {
    path: 'projects/:id',
    component: ProjectComponent,
    data: {
      onAuthRequired
    }
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

export function onAuthRequired({oktaAuth, router}) {
  console.log('onAuthRequired');
  router.navigate(['/login']);
}

export const Routing = RouterModule.forRoot(appRoutes, {useHash: true});
