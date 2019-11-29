import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {MainNavigationComponent} from './components/navigation/main-navigation/main-navigation.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {Routing} from './app.routing';
import {ProjectSettingsComponent} from './components/project-settings/project-settings.component';
import {NotesDialogComponent} from './components/dialog/notes-dialog/notes-dialog.component';
import {InfoDialogComponent} from './components/dialog/info-dialog/info-dialog.component';
import {HelpDialogComponent} from './components/dialog/help-dialog/help-dialog.component';
import {GlobalStore} from './store/global.store';
import {AlertComponent} from './components/alert/alert.component';
import {NewProjectComponent} from './components/dashboard/new-project/new-project.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProjectComponent} from './components/project/project.component';
import {CategoryNavigationComponent} from './components/navigation/category-navigation/category-navigation.component';
import {SearchFilterPipe} from './pipes/searchfilter.pipe';
import {FindingsCollectionComponent} from './components/test/finding/findings-collection.component';
import {StatusHistorySheetComponent, TestStatusComponent} from './components/test/test-status/test-status.component';
import {ProjectNavigationComponent} from './components/navigation/project-navigation/project-navigation.component';
import {CommentComponent} from './components/test/comment/comment.component';
import {TestsTableComponent} from './components/tests-table/tests-table.component';
import {TestFrameComponent} from './components/test/test-frame/test-frame.component';
import {TestNavigationComponent} from './components/navigation/test-navigation/test-navigation.component';
import {FindingDialogComponent} from './components/test/finding/finding-dialog.component';
import {OktaAuthModule} from '@okta/okta-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GlobalErrorHandler} from './shared/global-error-handler';
import {ImageCropperModule} from 'ngx-image-cropper';
import {LogoCroppingDialogComponent} from './components/project-settings/logo-upload-dialog/logo-cropping-dialog.component';
import {MaterialModule} from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {AuthenticationEffects} from "./store/effects/authentication.effects";

const oktaConfig = {
  issuer: 'https://dev-308298.okta.com/oauth2/default',
  redirectUri: 'https://localhost:4200/implicit/callback',
  clientId: '0oao3vimbi880l92d356',
  scope: 'openid email profile'
};

@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    ProjectSettingsComponent,
    NotesDialogComponent,
    InfoDialogComponent,
    LoginComponent,
    AlertComponent,
    NewProjectComponent,
    DashboardComponent,
    ProjectComponent,
    CategoryNavigationComponent,
    SearchFilterPipe,
    FindingsCollectionComponent,
    TestStatusComponent,
    ProjectNavigationComponent,
    CommentComponent,
    TestsTableComponent,
    TestFrameComponent,
    TestNavigationComponent,
    StatusHistorySheetComponent,
    FindingDialogComponent,
    HelpDialogComponent,
    LogoCroppingDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    OktaAuthModule.initAuth(oktaConfig),
    ImageCropperModule,
    MaterialModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot([ AuthenticationEffects ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useExisting: GlobalErrorHandler
    },
    GlobalStore
  ],
  entryComponents: [
    TestFrameComponent,
    NotesDialogComponent,
    InfoDialogComponent,
    HelpDialogComponent,
    StatusHistorySheetComponent,
    FindingDialogComponent,
    LogoCroppingDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
