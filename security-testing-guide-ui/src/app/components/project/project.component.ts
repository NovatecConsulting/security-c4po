import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projectId: string;
  testId: string;

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private projectService: ProjectService) {
    this.route.params.subscribe(params => {
      this.projectId = params.id;
    });
    this.sharedService.projectId = this.projectId;
  }

  ngOnInit() {
    this.projectService.getProjectDetailsById(this.projectId);
  }

}
