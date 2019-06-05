import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
// Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatBottomSheetModule, MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';

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
    HelpDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    OktaAuthModule.initAuth(oktaConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    GlobalStore
  ],
  entryComponents: [
    TestFrameComponent,
    NotesDialogComponent,
    InfoDialogComponent,
    HelpDialogComponent,
    StatusHistorySheetComponent,
    FindingDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
