import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ImagePosition} from "./model/image-position";

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

  filePreviewSource?: string;

  progressSpinnerDiameter = 64;

  get imageCenterPosition(): ImagePosition {
    const progressSpinnerRadius = this.progressSpinnerDiameter / 2

    return {
      x: this.previewImage.nativeElement.offsetWidth / 2 - progressSpinnerRadius,
      y: this.previewImage.nativeElement.offsetHeight / 2 - progressSpinnerRadius
    }
  }

  setFile(fileInputElement: any) {
    this.file = fileInputElement.files[0]
    const fileReader = new FileReader();

    fileReader.onload = () => {
      this.filePreviewSource = fileReader.result as string;
    }

    if (this.file) {
      const blob = this.file as Blob;
      fileReader.readAsDataURL(blob);
    } else {
      this.filePreviewSource = undefined;
    }
  }

  uploadFile() {
    if (!this.file) throw Error("file is undefined")
    this.upload.emit(this.file);
  }
}
