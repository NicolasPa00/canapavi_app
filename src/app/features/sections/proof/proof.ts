import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PROOF_STATS, PROOF_QUOTE, type ProofStat } from '../../../core/data/landing.data';
import { SectionHeadingComponent } from '../../../shared/ui/section-heading/section-heading';
import { CountUpDirective } from '../../../core/directives/count-up.directive';
import { RevealOnScrollDirective } from '../../../core/directives/reveal-on-scroll.directive';

/**
 * Tercer bloque de la landing (id="evidencia"): prueba social.
 * Cuatro cifras + una voz del territorio. Nada más.
 */
@Component({
  selector: 'app-proof',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './proof.html',
  styleUrl: './proof.scss',
  imports: [SectionHeadingComponent, CountUpDirective, RevealOnScrollDirective],
})
export class ProofComponent {
  protected readonly stats = PROOF_STATS;
  protected readonly quote = PROOF_QUOTE;

  /**
   * Valor ya formateado para el HTML prerenderizado. `afterNextRender` no corre
   * en el servidor, así que la directiva no puede escribirlo: lo hace la
   * plantilla, y en el navegador la directiva toma el relevo para animar.
   */
  protected display(stat: ProofStat): string {
    return `${stat.prefix ?? ''}${stat.value.toLocaleString('es-CO')}`;
  }
}
