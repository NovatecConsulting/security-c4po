import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../service/shared.service';
import {GlobalStore} from '../../store/global.store';
import {Location} from '@angular/common';
import {ApiService} from '../../service/api.service';
import {Router} from '@angular/router';
import {DashboardService} from '../../service/dashboard.service';
import {ProjectService} from '../../service/project.service';

@Component({
  selector: 'app-share',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss'],
  // providers: [GlobalStore] // will be cleaned up in comparison to global store defined in constructor
})
export class ProjectSettingsComponent implements OnInit {

  selectedTesterLogo: string;
  selectedCustomerLogo: string;

  objectKeys = Object.keys;

  testerLogosFolder = '../../../assets/nt-logo';
  customerLogosFolder = '../../../assets/customer-logo';

  testerLogos = {
    cyan: this.testerLogosFolder + '/cyan-tuerkis.png',
    orange: this.testerLogosFolder + '/orange-gelb.png',
    violet: this.testerLogosFolder + '/violett-rot.png',
    none: this.testerLogosFolder + '/../none.png'
  };

  customerLogos = {
    e_corp: this.customerLogosFolder + '/e-corp.png',
    acme: this.customerLogosFolder + '/acme.png',
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
              private apiService: ApiService,
              private router: Router,
              public dashboardService: DashboardService,
              public projectService: ProjectService) {
  }

  ngOnInit() {
    this.store.state$.subscribe(state => {
      this.selectedTesterLogo = state.selectedTesterLogo;
      this.tester = state.testerName;
      this.selectedCustomerLogo = state.selectedCustomerLogo;
      this.customer = state.customerName;
      this.projectName = state.projectName;
      this.linkPermissions = state.customerPermissions;
      this.includeCheckedOnly = state.includeCheckedOnly;
    });
    this.testedItems.tested = this.sharedService.getChecked;
    this.testedItems.total = this.sharedService.getTotal;
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

}
