import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ImagePosition} from "./model/image-position";
import {base64ToFile} from "ngx-image-cropper";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'seefood-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

  private _uploadInProgress = false;

  @Input() set uploadInProgress(value: boolean | null) {
    if (value !== null) {
      this._uploadInProgress = value;

      if (!value) {
        this.uploadFormGroup.get('image')?.enable();
      }
    }
  }

  get uploadInProgress(): boolean {
    return this._uploadInProgress;
  }

  @Output() upload = new EventEmitter<File>();

  @ViewChild('previewImage') previewImage!: ElementRef;

  uploadFormGroup = new FormGroup({
    image: new FormControl('', [Validators.required])
  })

  file?: File

  fileBase64Source?: string;

  imageChangedEvent?: any;

  progressSpinnerDiameter = 64;

  imageCenterPosition: ImagePosition = {
    x: 0,
    y: 0
  };

  imageCropped(event: any) {
    this.fileBase64Source = event.base64;
  }

  setFile(event: any) {
    this.imageChangedEvent = event;
  }

  uploadFile() {
    if (!this.fileBase64Source) throw Error("file is undefined")

    this.uploadFormGroup.get('image')?.disable();

    const imageFile = base64ToFile(this.fileBase64Source) as File;
    this.upload.emit(imageFile);
  }

  setImageCenterPosition(): void {
    const progressSpinnerRadius = this.progressSpinnerDiameter / 2
    this.imageCenterPosition = {
      x: this.previewImage ? this.previewImage.nativeElement.offsetWidth / 2 - progressSpinnerRadius : 0,
      y: this.previewImage ? this.previewImage.nativeElement.offsetHeight / 2 - progressSpinnerRadius : 0,
    }
  }
}
