import {Component, Inject, OnInit} from '@angular/core';
import {TestStatusService} from './test-status.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TestStatus} from './test-status';
import {TestProgress} from './test-progress.enum';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from '@angular/material';

@Component({
  selector: 'app-test-status',
  templateUrl: './test-status.component.html',
  styleUrls: ['./test-status.component.scss']
})
export class TestStatusComponent implements OnInit {

  selectedIndex: number;

  firstFormGroup: FormGroup;

  testProgressSteps: string[] = [
    TestProgress[TestProgress.OPEN],
    TestProgress[TestProgress.CHECKED],
    TestProgress[TestProgress.REPORTED],
    TestProgress[TestProgress.UNDER_REVIEW],
    TestProgress[TestProgress.TRIAGED]
  ];

  constructor(private testStatusService: TestStatusService,
              private bottomSheet: MatBottomSheet,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.selectedIndex = 0;

    this.testStatusService.getTestStatusesById(localStorage.getItem('testId')).then(testStatuses => {
      if (testStatuses.length > 0) {
        this.selectedIndex = +TestProgress[testStatuses[0].testProgress];
      } else {
        const initTestStatusOpen = new TestStatus(localStorage.getItem('testId'), TestProgress.OPEN);
        this.testStatusService.addTestStatus(initTestStatusOpen);
      }
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

  }

  selectionChange(event: any) {
    const testProgress: TestProgress = event.selectedIndex;
    const testStatus = new TestStatus(localStorage.getItem('testId'), testProgress);

    if (this.selectedIndex !== event.selectedIndex) {
      this.testStatusService.addTestStatus(testStatus).then(successful => {
        this.selectedIndex = event.selectedIndex;
      });
    }
  }

  showStatusHistory(): void {
    this.testStatusService.getTestStatusesById(localStorage.getItem('testId')).then(testResults => {
      this.bottomSheet.open(StatusHistorySheetComponent, {
        data: testResults
      });
    });
  }

}

@Component({
  selector: 'app-status-history-sheet',
  templateUrl: './status-history-sheet/status-history-sheet.html',
  styleUrls: ['./status-history-sheet/status-history-sheet.scss']
})
export class StatusHistorySheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: TestStatus[],
              private testStatusService: TestStatusService) {
  }

  deleteStatus(id: string) {
    this.testStatusService.removeTestStatus(id).then(successful => {
      console.log('successful:', successful);
    });
  }

}
