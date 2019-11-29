import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {GlobalStore} from '../../store/global.store';
import {Location} from '@angular/common';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {DashboardService} from '../../services/dashboard.service';
import {ProjectService} from '../../services/project.service';
import {MatDialog} from '@angular/material';
import {LogoCroppingDialogComponent} from './logo-upload-dialog/logo-cropping-dialog.component';
import {Project} from '../../models/project';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppActions} from '../../app.actions';

@Component({
  selector: 'app-share',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss'],
  // providers: [GlobalStore] // will be cleaned up in comparison to global store defined in constructor
})
export class ProjectSettingsComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput', {static: false}) fileInput;

  project: Project;

  projectServiceSubscription: Subscription;

  selectedTesterLogo: string;
  customerLogo: any = '';

  objectKeys = Object.keys;

  testerLogosFolder = '../../../assets/nt-logo';

  testerLogos = {
    cyan: this.testerLogosFolder + '/cyan-tuerkis.png',
    orange: this.testerLogosFolder + '/orange-gelb.png',
    violet: this.testerLogosFolder + '/violett-rot.png',
    none: this.testerLogosFolder + '/../none.png'
  };

  tester: string;
  customer: string;
  projectName: string;

  linkPermissions: {
    read: boolean,
    comment: boolean
  };

  includeCheckedOnly: boolean;

  testedItems: {
    tested: number,
    total: number
  } = {
    tested: 0,
    total: 0
  };

  loading = false;

  now = new Date();

  constructor(private sharedService: SharedService,
              private location: Location,
              private store: GlobalStore,
              private appActions: AppActions,
              private apiService: ApiService,
              private router: Router,
              public dialog: MatDialog,
              public dashboardService: DashboardService,
              public projectService: ProjectService,
              public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.store.state$.subscribe(state => {
      // this.selectedTesterLogo = 'cyan';
      // this.tester = state.testerName;
      // this.customer = state.customerName;
      // this.projectName = state.projectName;
      this.testedItems.tested = this.sharedService.getChecked;
      this.testedItems.total = this.sharedService.getTotal;
      this.linkPermissions = state.customerPermissions;
      this.includeCheckedOnly = state.includeCheckedOnly;
    });
    this.testedItems.tested = this.sharedService.getChecked;
    this.testedItems.total = this.sharedService.getTotal;

    this.projectServiceSubscription = this.projectService.projectDetails$.subscribe((project) => {
      console.log('project', project);
      this.project = project;

      this.tester = project.testerName;
      this.selectedTesterLogo = project.selectedLogoTester;
      this.customer = project.client;
      this.customerLogo = project.logoClient;
      this.projectName = project.title;
    });
    this.projectService.getProjectDetailsById(localStorage.getItem('activeProjectId'));
  }

  /*openLogoUploadDialog(): void {
    const dialogRef = this.dialog.open(LogoCroppingDialogComponent, {
      height: '50%',
      width: '50%',
      data: {name: 'abc'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('image upload dialog closed.', result);
    });
  }*/

  // Image Cropper
  fileChangeEvent(event: any): void {
    console.log('fileChangeEvent', event);
    // this.imageChangedEvent = event;
    const logoCroppingDialog = this.dialog.open(LogoCroppingDialogComponent, {
      // height: '50%',
      // width: '80%',
      height: '500px',
      width: '500px',
      data: {event: event}
    });
    logoCroppingDialog.afterClosed().subscribe(croppedImage => {
      console.log('image upload dialog closed.');
      this.customerLogo = croppedImage;
      this.fileInput.nativeElement.value = '';
    });
  }

  saveLogoRadioChangeToStore(value, field) {
    switch (field) {
      case 'tester':
        this.store.setTesterLogo(value);
        break;
      case 'customer':
        this.store.setCustomerLogo(value);
        break;
    }
  }

  saveStringToStore(event, field) {
    console.log('saveStringToStore()', event);
    switch (field) {
      case 'tester':
        this.store.setTesterName(event);
        break;
      case 'customer':
        this.store.setCustomerName(event);
        break;
      case 'project':
        this.store.setProjectName(event);
        break;
    }
  }

  saveBooleanToStore(event, field) {
    switch (field) {
      case 'includeCheckedOnly':
        this.store.setIncludeCheckedOnly(event);
        break;
    }
  }

  createLink() {
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
      },
      3000);
  }

  navigateBack() {
    this.location.back();
  }

  deleteProject() {
    console.log(this.sharedService.projectId);
    if (confirm('Are you sure you want to delete project: ' + this.sharedService.projectId + '?')) {
      this.dashboardService.deleteProject(this.sharedService.projectId);
    }
  }

  ngOnDestroy(): void {
    const projectUpdate: Project = {
      client: this.customer,
      createdAt: '',
      id: '',
      logoClient: this.customerLogo,
      selectedLogoTester: this.selectedTesterLogo,
      testerName: this.authenticationService.getCurrentLoggedInUser().claims.name,
      title: this.project.title
    };
    console.log('Saving project settings to backend ...', projectUpdate);
    this.projectService.saveProjectSettings(this.project.id, projectUpdate);
    this.projectServiceSubscription.unsubscribe();
    this.appActions.saveProjectSettings();
  }

}
