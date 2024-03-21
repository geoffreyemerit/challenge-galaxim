import { Component, ChangeDetectionStrategy } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'app-rules-challenge',
  templateUrl: './rules-challenge.component.html',
  styleUrls: ['./rules-challenge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RulesChallengeComponent {

  public page = 1;

  public pageLabel!: string;

  constructor() {

    pdfDefaultOptions.doubleTapZoomFactor = '70%'; // The default value is '200%'
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; // The default value is 4096 * 4096 pixels,
    }
}