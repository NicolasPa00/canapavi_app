import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PILLARS } from '../../../core/data/landing.data';
import { SectionHeadingComponent } from '../../../shared/ui/section-heading/section-heading';
import { RevealOnScrollDirective } from '../../../core/directives/reveal-on-scroll.directive';

/**
 * Segundo bloque de la landing (id="proposito"): propuesta de valor.
 * Tres pilares, una línea cada uno. Los iconos van en SVG inline —dibujados a
 * partir de las ilustraciones de /public— para no cargar 3 MB de PNG.
 */
@Component({
  selector: 'app-pillars',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pillars.html',
  styleUrl: './pillars.scss',
  imports: [SectionHeadingComponent, RevealOnScrollDirective],
})
export class PillarsComponent {
  protected readonly pillars = PILLARS;

  /** Rotación de los cinco pétalos del hibisco (icono de Comunidad). */
  protected readonly petals = [0, 72, 144, 216, 288];
}
