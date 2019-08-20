import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../service/api.service';
import {Project} from '../../../model/project';
import {DashboardService} from '../../../service/dashboard.service';
import {OktaAuthService} from '@okta/okta-angular';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  projectForm = new FormGroup({
    clientName: new FormControl('', [Validators.required]),
    titleName: new FormControl('', Validators.required)
  });

  constructor(private apiService: ApiService,
              private dashboardService: DashboardService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.projectForm.get('clientName').setValue('My cool client');
    this.projectForm.get('titleName').setValue('Some project title');
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.projectForm.controls[controlName].hasError(errorName);
  };

  public createProject() {
    const project = new Project();
    project.client = this.projectForm.value.clientName;
    project.title = this.projectForm.value.titleName;
    project.testerName = this.authService.getCurrentLoggedInUser().claims.name;
    project.selectedLogoTester = 'none';
    this.dashboardService.addProject(project);
    this.projectForm.reset();
    // this.projectForm.get('clientName').setValue('');
    this.projectForm.markAsUntouched();
  };

}
