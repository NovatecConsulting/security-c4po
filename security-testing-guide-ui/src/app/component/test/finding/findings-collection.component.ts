import {Component, OnDestroy, OnInit} from '@angular/core';
import {Severity} from '../../../model/severity.enum';
import {SharedService} from '../../../service/shared.service';
import {FindingService} from './finding.service';
import {Finding} from './finding';
import {FindingComponent} from './finding.component';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-findings-collection',
  templateUrl: './findings-collection.component.html',
  styleUrls: ['./findings-collection.component.scss']
})
export class FindingsCollectionComponent implements OnInit {

  subscription: Subscription;

  constructor(public findingService: FindingService,
              private sharedService: SharedService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  addFinding() {
    const finding = new Finding();
    finding.title = 'MOCK-TITLE';
    finding.testId = 'OTG-INFO-001';
    finding.severity = Severity.LOW;
    this.findingService.addFinding(finding);
  }

  editFinding(id: string) {
    this.findingService.findings$.subscribe(
      (findings) => {
        const finding = findings.find(f => f.id === id);
        console.log(finding);
        const dialogRef = this.dialog.open(FindingComponent, {
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
