import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {MainNavigationComponent} from './component/navigation/main-navigation/main-navigation.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './component/login/login.component';
import {AuthInterceptor} from './interceptor/auth-interceptor';
import {Routing} from './app.routing';
import {ProjectSettingsComponent} from './component/project-settings/project-settings.component';
import {NotesDialogComponent} from './component/dialog/notes-dialog/notes-dialog.component';
import {InfoDialogComponent} from './component/dialog/info-dialog/info-dialog.component';
import {HelpDialogComponent} from './component/dialog/help-dialog/help-dialog.component';
import {GlobalStore} from './store/global.store';
import {AlertComponent} from './component/alert/alert.component';
import {NewProjectComponent} from './component/dashboard/new-project/new-project.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ProjectComponent} from './component/project/project.component';
import {CategoryNavigationComponent} from './component/navigation/category-navigation/category-navigation.component';
import {SearchFilterPipe} from './pipe/searchfilter.pipe';
import {FindingsCollectionComponent} from './component/test/finding/findings-collection.component';
import {StatusHistorySheetComponent, TestStatusComponent} from './component/test/test-status/test-status.component';
import {ProjectNavigationComponent} from './component/navigation/project-navigation/project-navigation.component';
import {CommentComponent} from './component/test/comment/comment.component';
import {TestsTableComponent} from './component/tests-table/tests-table.component';
import {TestFrameComponent} from './component/test/test-frame/test-frame.component';
import {TestNavigationComponent} from './component/navigation/test-navigation/test-navigation.component';
import {FindingDialogComponent} from './component/test/finding/finding-dialog.component';
import {OktaAuthModule} from '@okta/okta-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GlobalErrorHandler} from './shared/global-error-handler';
import {ImageCropperModule} from 'ngx-image-cropper';
import {LogoCroppingDialogComponent} from './component/project-settings/logo-upload-dialog/logo-cropping-dialog.component';
import {MaterialModule} from './material/material.module';

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
    HelpDialogComponent,
    LoginComponent,
    ProjectSettingsComponent,
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
    MaterialModule
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
