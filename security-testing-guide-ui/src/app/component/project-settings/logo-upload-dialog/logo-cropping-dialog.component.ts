import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-logo-upload-dialog',
  templateUrl: './logo-cropping-dialog.component.html',
  styleUrls: ['./logo-cropping-dialog.component.scss']
})
export class LogoCroppingDialogComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    public dialogRef: MatDialogRef<LogoCroppingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.imageChangedEvent = this.data.event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  /*onNoClick(): void {
    this.dialogRef.close();
  }*/

  onSaveClick(): void {
    this.dialogRef.close(this.croppedImage);
  }

}

export interface DialogData {
  name: string;
  event: any;
}
