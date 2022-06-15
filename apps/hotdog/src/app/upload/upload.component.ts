import {Component} from '@angular/core';
import {ClassifierService} from "../classifier.service";

@Component({
  selector: 'seefood-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

  constructor(private classifier: ClassifierService) {
  }

  file?: File

  filePreviewSource?: string;

  setFile(fileInputElement: any) {
    this.file = fileInputElement.files[0]
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const readerResult = fileReader.result;

      if (readerResult) {
        this.filePreviewSource = readerResult as string;
      }
    }

    const blob = this.file as Blob;
    fileReader.readAsDataURL(blob);
  }

  async classify() {
    if (!this.file) throw Error("file is undefined")
    const res = await this.classifier.classifyHotdog(this.file)
    alert(JSON.stringify(res))
  }
}
