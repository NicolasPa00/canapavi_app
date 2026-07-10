import { Component, ChangeDetectionStrategy } from '@angular/core';
import { STRATEGIC_LINES } from '../../../core/data/strategic-lines.data';
import { SectionHeadingComponent } from '../../../shared/ui/section-heading/section-heading';
import { RevealOnScrollDirective } from '../../../core/directives/reveal-on-scroll.directive';

/** Sección "Líneas Estratégicas" (id="lineas"). */
@Component({
  selector: 'app-strategic-lines',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, RevealOnScrollDirective],
  templateUrl: './strategic-lines.html',
  styleUrl: './strategic-lines.scss',
})
export class StrategicLinesComponent {
  protected readonly lines = STRATEGIC_LINES;
}
