import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements OnInit {

  versionBackend = 'v0.0.1';
  versionFrontend = 'v0.0.1';

  testingGuideVersion = 'v4';
  linkToWebsite = 'https://www.owasp.org/index.php/OWASP_Testing_Project';

  constructor(public dialogRef: MatDialogRef<HelpDialogComponent>) {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
