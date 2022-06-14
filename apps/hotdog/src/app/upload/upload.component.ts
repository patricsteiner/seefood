import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'seefood-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

  @Output() upload = new EventEmitter<File>();

  file?: File

  setFile(fileInputElement: any) {
    this.file = fileInputElement.files[0]
  }

  uploadFile() {
    if (!this.file) throw Error("file is undefined")
    this.upload.emit(this.file);
  }
}
