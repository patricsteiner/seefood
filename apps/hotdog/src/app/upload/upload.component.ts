import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ImagePosition} from "./model/image-position";
import {base64ToFile} from "ngx-image-cropper";

@Component({
  selector: 'seefood-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

  @Input() uploadInProgress: boolean | null = false;

  @Output() upload = new EventEmitter<File>();

  @ViewChild('previewImage') previewImage!: ElementRef;

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
