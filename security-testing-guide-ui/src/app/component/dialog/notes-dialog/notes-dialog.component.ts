import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ApiService} from '../../../service/api.service';
import {SecurityTest} from '../../../model/security-test/security-test';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.css']
})
export class NotesDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public item: SecurityTest,
              private apiService: ApiService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    console.log('getNotes: not yet implemented');
    // this.apiService.getTestByTestNumber(this.item.id).subscribe(
    //   (item) => {
    //     this.item = item;
    //     console.log('notes of ' + this.item.id + ': \"' + this.item.comment + '\"');
    //   }
    // );
  }

  updateNotes(): void {
    console.log('updateNotes: not yet implemented');
    // console.log('notes of ' + this.item.id + ': \"' + this.item.comment + '\"');
    // this.apiService.updateTest(this.item).subscribe(
    //   (response) => {
    //     if (response.statusMap === 200) {
    //       console.log('Notes updated.');
    //     } else {
    //       console.log(response);
    //     }
    //   }
    // );
  }

}
