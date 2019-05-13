import {Component, OnInit} from '@angular/core';
import {FindingService} from '../finding/finding.service';
import {SharedService} from '../../../service/shared.service';
import {CommentService} from '../comment/comment.service';
import {Router} from '@angular/router';
import {FindingComponent} from '../finding/finding.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-test-frame',
  templateUrl: './test-frame.component.html',
  styleUrls: ['./test-frame.component.scss']
})
export class TestFrameComponent implements OnInit {

  // statusLoaded = false;
  findingsLoaded = false;
  commentsLoaded = false;

  constructor(private findingService: FindingService,
              private sharedService: SharedService,
              private commentService: CommentService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    const splitUrl = this.router.url.split('/');
    const testId = splitUrl[splitUrl.length - 1];

    this.findingsLoaded = false;
    this.commentsLoaded = false;

    this.findingService.getAllFindingsForTest(this.sharedService.projectId, testId).then(successful => {
      this.findingsLoaded = successful;
    });
    this.commentService.getAllCommentsForTest(this.sharedService.projectId, testId).then(successful => {
      this.commentsLoaded = successful;
    });
  }

  addFinding(): void {
    const dialogRef = this.dialog.open(FindingComponent, {
      width: '1000px',
      height: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed finding dialog:', result);
    });
  }

  addComment() {
  }

}
