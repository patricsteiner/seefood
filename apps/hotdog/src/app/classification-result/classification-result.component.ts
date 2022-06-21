import {Component, Input} from '@angular/core';
import {HotdogClassification} from "@seefood/api-interfaces";

@Component({
  selector: 'seefood-classification-result',
  templateUrl: './classification-result.component.html',
  styleUrls: ['./classification-result.component.scss'],
})
export class ClassificationResultComponent {

  @Input() classificationResult!: HotdogClassification;

}
