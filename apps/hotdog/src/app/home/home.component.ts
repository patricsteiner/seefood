import {Component} from '@angular/core';
import {ClassifierService} from "../classifier.service";
import {BehaviorSubject, Observable, ReplaySubject, Subject, tap} from "rxjs";
import {HotdogClassification} from "@seefood/api-interfaces";

@Component({
  selector: 'seefood-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  classificationResult$ = new Observable<HotdogClassification>();

  uploadingImage$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly classifierService: ClassifierService
  ) {
  }

  upload(file: File) {
    this.uploadingImage$.next(true);
    this.classificationResult$ = this.classifierService.classifyHotdog(file)
      .pipe(
        tap(() => this.uploadingImage$.next(false))
      );
  }
}
