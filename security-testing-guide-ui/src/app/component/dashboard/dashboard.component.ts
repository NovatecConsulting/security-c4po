import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from './dashboard.service';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  projectsLoaded = false;
  accessToken: String;

  constructor(public dashboardService: DashboardService,
              private router: Router,
              private oktaAuth: OktaAuthService) {
  }

  async ngOnInit() {
    this.accessToken = await this.oktaAuth.getAccessToken();
    this.dashboardService.getAllProjects().then(successful => {
      this.projectsLoaded = successful;
    });
  }

  onProjectCardClick(projectId: string) {
    localStorage.setItem('activeProjectId', projectId);
    this.router.navigate(['/projects', projectId]);
  }

  ngOnDestroy() {
    this.projectsLoaded = false;
    localStorage.removeItem('category');
    this.dashboardService.clearLoadedProjects();
  }

}
