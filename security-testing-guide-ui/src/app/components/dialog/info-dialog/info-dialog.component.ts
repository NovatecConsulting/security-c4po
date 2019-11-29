import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {SecurityTest} from '../../../models/security-test/security-test';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public item: SecurityTest,
              private apiService: ApiService) { }

  list = [];

  onOkClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    this.apiService.getTestByTestNumber(this.item.id).subscribe(
      (item) => {
        this.item = item;
        console.log('info of ' + this.item.id + ': \"' + this.item.description + '\"');
        if (this.item.description.indexOf('* ') >= 0) {
          this.convertToList(this.item.description);
        } else {
          this.list.push(this.item.description);
        }
      }
    );
  }

  openLink(link: string) {
    console.log('Opening link', link);
    window.open(link);
  }

  convertToList(description: string) {
    const splits = description.split('* ');
    splits.splice(0, 1);
    // console.log(splits);
    this.list = splits;
    // console.log(this.list.length);
  }

}
