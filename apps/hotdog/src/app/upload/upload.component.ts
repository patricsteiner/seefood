import {Component, HostListener} from '@angular/core';
import {ClassifierService} from "../classifier.service";

@Component({
  selector: 'seefood-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {

  filePreviewSource?: string;

  selectedFile?: File;

  @HostListener('change', ['$event.target.files']) fileChange(list: FileList) {
    this.setFile(list[0]);
  }

  constructor(private classifier: ClassifierService) {
  }

  setFile(file: File) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const readerResult = fileReader.result;

      if (readerResult) {
        this.filePreviewSource = readerResult as string;
      }
    }

    const blob = file as Blob;
    fileReader.readAsDataURL(blob);
  }

  async classify() {
    if (!this.selectedFile) throw Error("file is undefined")
    const res = await this.classifier.classifyHotdog(this.selectedFile)
    alert(JSON.stringify(res))
  }
}
