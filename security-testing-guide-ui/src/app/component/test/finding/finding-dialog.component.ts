import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FindingService} from '../../../service/finding.service';
import {Finding} from '../../../model/security-test/finding';
import {Severity} from '../../../model/security-test/severity.enum';

@Component({
  selector: 'app-finding',
  templateUrl: './finding-dialog.component.html',
  styleUrls: ['./finding-dialog.component.scss']
})
export class FindingDialogComponent implements OnInit {

  severityLevels = Object.keys(Severity);

  affectedUrls = [
    'https://www.example.local/portal?user=admin&test=some+very+long+parameter+value+' +
    'VKUIwrlhuMIVEpidWiKtrS3rVO+kkvrBc0QBQ6qmJlEKazIdlyShiVTzZzThqDtAM/UVnl91TJn9505kZnduw==',
    'http://my.secret.dev.stage.example.local/index.html',
    'https://customers.example.local/sample.htm?beds=aunt&bike=believe'
  ];

  constructor(public dialogRef: MatDialogRef<FindingDialogComponent>,
              private findingService: FindingService,
              @Inject(MAT_DIALOG_DATA) public finding: Finding) {
  }

  ngOnInit() {
    console.log('finding', this.finding);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    console.log('saving finding:', this.finding);
    if (this.finding.id === undefined) {
      this.findingService.addFinding(this.finding);
    } else {
      this.findingService.updateFinding(this.finding);
    }
    // finding.title = '[myTitle]-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12);
    // finding.testId = localStorage.getItem('testId');
    // finding.description = '(added from dialog button)';
    // finding.severity = Severity.MEDIUM;
    //
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    if (confirm('Are you sure?')) {
      this.findingService.removeFinding(localStorage.getItem('activeProjectId'), this.finding.id);
    }
    this.dialogRef.close();
  }

  deleteUrl(url): void {
    console.log('Not implemented: deleting url:', url);
  }

  addUrl(): void {
    console.log('Not implemented: add url.');
  }

}
