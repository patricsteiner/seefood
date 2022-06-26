import {Component} from '@angular/core';
import {ClassifierService} from '../classifier.service';
import {BehaviorSubject, take, tap} from 'rxjs';
import {ClassificationResultComponent} from '../classification-result/classification-result.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'seefood-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  uploadingImage$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly classifierService: ClassifierService,
    private readonly dialog: MatDialog,
  ) {
  }

  upload(file: File) {
    this.uploadingImage$.next(true);

    this.classifierService.classifyHotdog(file)
      .pipe(
        tap(() => this.uploadingImage$.next(false)),
        take(1),
      )
      .subscribe(result => {
        this.dialog.open(ClassificationResultComponent, {
          data: result,
        });
      });
  }
}
