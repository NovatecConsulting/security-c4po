import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../../service/dashboard.service';
import {OktaAuthService} from '@okta/okta-angular';
import {TestStatusService} from '../../service/test-status.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  projectsLoaded = false;
  checked: {[projectId: string]: {total: number, percentage: number} } = {};

  constructor(public dashboardService: DashboardService,
              private testStatusService: TestStatusService,
              private router: Router,
              private oktaAuth: OktaAuthService,
              private authenticationService: AuthenticationService) {
  }

  async ngOnInit() {
    if (!this.authenticationService.getLoggedInUser()) {
      this.router.navigate(['/login']);
    }

    this.dashboardService.getAllProjects().then(successful => {
      this.dashboardService.project$.subscribe((projects) => {
        const projectIds = projects.map(p => p.id);
        projectIds.forEach((projectId) => {
          this.testStatusService.getAllTestStatusOfProject(projectId).subscribe((testStatuses) => {
            const total = new Set(testStatuses.map(x => x.testId)).size;
            this.checked[projectId] = { total: total, percentage: total * 100 / 90 };
          });
        });
      });
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
