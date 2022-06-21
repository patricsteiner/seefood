import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ImagePosition} from "./model/image-position";
import {base64ToFile} from "ngx-image-cropper";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'seefood-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

  @ViewChild('previewImage') previewImage!: ElementRef;

  @Output() upload = new EventEmitter<File>();

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

  file?: File

  fileBase64Source?: string;

  imageChangedEvent?: any;

  progressSpinnerDiameter = 64;

  uploadFormGroup = new FormGroup({
    image: new FormControl('', [Validators.required])
  })

  imageCenterPosition: ImagePosition = {
    x: 0,
    y: 0
  };

  imageCropped(event: any) {
    this.fileBase64Source = event.base64;
  }

  setFile(event: any) {
    this.file = event.target.files[0]
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
      x: this.previewImage.nativeElement.offsetWidth / 2 - progressSpinnerRadius,
      y: this.previewImage.nativeElement.offsetHeight / 2 - progressSpinnerRadius,
    }
  }
}
