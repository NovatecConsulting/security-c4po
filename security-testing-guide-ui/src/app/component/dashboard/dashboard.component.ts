import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../../service/dashboard.service';
import {OktaAuthService} from '@okta/okta-angular';
import {TestStatusService} from '../../service/test-status.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  projectsLoaded = false;
  accessToken: String;
  checked: {[projectId: string]: {total: number, percentage: number} } = {};

  constructor(public dashboardService: DashboardService,
              private testStatusService: TestStatusService,
              private router: Router,
              private oktaAuth: OktaAuthService) {
  }

  async ngOnInit() {
    if (!await this.oktaAuth.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.accessToken = await this.oktaAuth.getAccessToken();

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
