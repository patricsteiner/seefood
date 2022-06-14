import {Component} from '@angular/core';
import {ClassifierService} from '../classifier.service';

@Component({
  selector: 'seefood-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

  constructor(
    private readonly classifier: ClassifierService,
  ) {
  }

  file?: File;

  setFile(fileInputElement: EventTarget) {
    const fileList = (fileInputElement as HTMLInputElement).files;

    if (fileList) {
      this.file = fileList[0];
    }
  }

  async classify() {
    if (!this.file) {
      throw Error('file is undefined');
    }

    const res = await this.classifier.classifyHotdog(this.file);
    const stringResult = JSON.stringify(res);

    alert(stringResult);
  }
}
