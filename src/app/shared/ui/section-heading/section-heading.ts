import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RevealOnScrollDirective } from '../../../core/directives/reveal-on-scroll.directive';

/**
 * Encabezado de sección reutilizable: antetítulo + título + intro opcional.
 * `onDark` adapta el color para fondos oscuros.
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealOnScrollDirective],
  template: `
    <div
      class="heading"
      [class.heading--center]="align() === 'center'"
      [class.heading--on-dark]="onDark()"
    >
      @if (eyebrow()) {
        <p class="heading__eyebrow" appReveal="fade">{{ eyebrow() }}</p>
      }
      <h2 class="heading__title" [attr.id]="headingId() || null" appReveal>{{ heading() }}</h2>
      @if (intro()) {
        <p class="heading__intro" appReveal data-reveal-delay="2">{{ intro() }}</p>
      }
    </div>
  `,
  styleUrl: './section-heading.scss',
})
export class SectionHeadingComponent {
  readonly eyebrow = input<string>();
  readonly heading = input.required<string>();
  /** Id aplicado al `<h2>`, para que la sección lo referencie con aria-labelledby. */
  readonly headingId = input<string>();
  readonly intro = input<string>();
  readonly align = input<'left' | 'center'>('left');
  readonly onDark = input(false);
}
