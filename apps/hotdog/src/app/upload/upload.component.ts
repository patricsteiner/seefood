import {Component} from '@angular/core';
import {ClassifierService} from "../classifier.service";
import {delay, take, tap} from "rxjs";

@Component({
  selector: 'seefood-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

  constructor(private classifier: ClassifierService) {
  }

  file?: File

  uploadLoading = false;

  setFile(fileInputElement: any) {
    this.file = fileInputElement.files[0]
  }

  classify() {
    if (!this.file) throw Error("file is undefined")

    this.uploadLoading = true;

    this.classifier.classifyHotdog(this.file)
      .pipe(
        take(1),
        tap(() => this.uploadLoading = false),
        delay(100)
      ).subscribe(result => {
        alert(JSON.stringify(result))
      });
  }
}
