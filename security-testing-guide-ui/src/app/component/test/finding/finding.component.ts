import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FindingService} from './finding.service';
import {Finding} from './finding';
import {Severity} from '../../../model/severity.enum';

@Component({
  selector: 'app-finding',
  templateUrl: './finding.component.html',
  styleUrls: ['./finding.component.scss']
})
export class FindingComponent implements OnInit {

  severityLevels = Object.keys(Severity).filter(key => typeof Severity[key as any] === 'number');

  urls = [
    '[DUMMY]https://aftermath.example.com/?attack=arm&bomb=book#basin',
    '[DUMMY]http://attack.example.org/badge/belief?airport=branch',
    '[DUMMY]https://addition.example.com/sample.htm?beds=aunt&bike=believe'
  ];

  constructor(public dialogRef: MatDialogRef<FindingComponent>,
              private findingService: FindingService,
              @Inject(MAT_DIALOG_DATA) public finding: Finding) {
  }

  ngOnInit() {
    // this.getInfo();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    const finding = new Finding();
    finding.title = '[myTitle]-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12);
    finding.testId = localStorage.getItem('testId');
    finding.description = '(added from dialog button)';
    finding.severity = Severity.MEDIUM;
    this.findingService.addFinding(finding);
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
