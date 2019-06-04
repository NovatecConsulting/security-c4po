import {Component, OnDestroy, OnInit} from '@angular/core';
import {Severity} from '../../../model/security-test/severity.enum';
import {SharedService} from '../../../service/shared.service';
import {FindingService} from '../../../service/finding.service';
import {Finding} from '../../../model/security-test/finding';
import {FindingDialogComponent} from './finding-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-findings-collection',
  templateUrl: './findings-collection.component.html',
  styleUrls: ['./findings-collection.component.scss']
})
export class FindingsCollectionComponent implements OnInit {

  constructor(public findingService: FindingService,
              private sharedService: SharedService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  editFinding(id: string) {
    this.findingService.findings$.subscribe(
      (findings) => {
        const finding = findings.find(f => f.id === id);
        console.log('finding', finding);
        const dialogRef = this.dialog.open(FindingDialogComponent, {
          width: '1110px',
          height: '750px',
          disableClose: true,
          data: finding
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('closed finding dialog:', result);
        });
      }
    ).unsubscribe();
    // this.subscription.unsubscribe();
    console.log('editFinding() done.');
  }

  removeFinding(id: string) {
    this.findingService.removeFinding(this.sharedService.projectId, id);
  }

}
