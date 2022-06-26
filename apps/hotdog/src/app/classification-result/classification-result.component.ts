import {Component, Inject} from '@angular/core';
import {HotdogClassification} from '@seefood/api-interfaces';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'seefood-classification-result',
  templateUrl: './classification-result.component.html',
  styleUrls: ['./classification-result.component.scss'],
})
export class ClassificationResultComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<ClassificationResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HotdogClassification,
  ) {
  }

  close() {
    this.dialogRef.close();
  }
}
