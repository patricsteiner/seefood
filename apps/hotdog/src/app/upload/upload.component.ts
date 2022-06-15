import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'seefood-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

  @Output() upload = new EventEmitter<File>();

  file?: File

  filePreviewSource?: string;

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
