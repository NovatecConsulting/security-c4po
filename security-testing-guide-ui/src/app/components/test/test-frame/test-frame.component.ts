import {Component, OnInit} from '@angular/core';
import {FindingService} from '../../../services/finding.service';
import {SharedService} from '../../../services/shared.service';
import {CommentService} from '../../../services/comment.service';
import {Router} from '@angular/router';
import {FindingDialogComponent} from '../finding/finding-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Finding} from '../../../models/security-test/finding';
import {Severity} from '../../../models/security-test/severity.enum';

@Component({
  selector: 'app-test-frame',
  templateUrl: './test-frame.component.html',
  styleUrls: ['./test-frame.component.scss']
})
export class TestFrameComponent implements OnInit {

  // statusLoaded = false;
  findingsLoaded = false;
  commentsLoaded = false;

  testId: string;

  constructor(private findingService: FindingService,
              private sharedService: SharedService,
              private commentService: CommentService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    const splitUrl = this.router.url.split('/');
    this.testId = splitUrl[splitUrl.length - 1];

    this.findingsLoaded = false;
    this.commentsLoaded = false;

    this.sharedService.projectId = splitUrl[splitUrl.length - 2];
    console.log('this.sharedService.projectId', this.sharedService.projectId);
    console.log('testId', this.testId);

    this.findingService.getAllFindingsForTest(this.sharedService.projectId, this.testId).then(successful => {
      this.findingsLoaded = successful;
    });
    this.commentService.getAllCommentsForTest(this.sharedService.projectId, this.testId).then(successful => {
      this.commentsLoaded = successful;
    });
  }

  addFinding(): void {
    const finding = new Finding();
    finding.title = 'Give me a title ...';
    finding.testId = this.testId;
    finding.severity = Severity.INFO;
    const dialogRef = this.dialog.open(FindingDialogComponent, {
      // width: '100%',
      // height: '100%',
      disableClose: true,
      data: finding
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed finding dialog:', result);
    });
  }

  addComment() {
  }

}
