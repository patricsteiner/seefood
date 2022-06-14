import {Component} from '@angular/core';
import {ClassifierService} from "../classifier.service";
import {Observable} from "rxjs";
import {HotdogClassification} from "@seefood/api-interfaces";

@Component({
  selector: 'seefood-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  classificationResult$ = new Observable<HotdogClassification>();

  constructor(
    private readonly classifierService: ClassifierService
  ) {
  }

  upload(file: File) {
    this.classificationResult$ = this.classifierService.classifyHotdog(file);
  }
}
