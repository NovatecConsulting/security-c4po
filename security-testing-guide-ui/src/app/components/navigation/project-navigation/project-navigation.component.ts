import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {Location} from '@angular/common';
import {GlobalStore} from '../../../store/global.store';
import {SharedService} from '../../../services/shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-navigation',
  templateUrl: './project-navigation.component.html',
  styleUrls: ['./project-navigation.component.scss']
})
export class ProjectNavigationComponent implements OnInit {

  constructor(private location: Location,
              private store: GlobalStore,
              private router: Router,
              private sharedService: SharedService,
              public projectService: ProjectService) { }

  ngOnInit() {
  }

  navigateBack() {
    localStorage.removeItem('selectedCategory');
    localStorage.removeItem('activeProjectId');
    this.store.setProjectName('');
    this.location.back();
  }

  settings(projectId) {
    this.sharedService.projectId = projectId;
    this.router.navigate(['/projects/' + projectId + '/settings']);
  }

}
