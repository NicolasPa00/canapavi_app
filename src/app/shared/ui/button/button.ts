import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Botón institucional reutilizable.
 * - Si recibe `link`, navega con el router (sin recargar la página).
 * - Si recibe `href`, renderiza un enlace `<a>` (ideal para anclas #seccion).
 * - Si no, renderiza un `<button>` (emite el evento click nativo del host).
 *
 * Variantes: primary | secondary | ghost | gold | on-dark
 */
@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (link(); as route) {
      <a
        [routerLink]="route"
        [fragment]="fragment()"
        class="btn"
        [class]="'btn--' + variant() + ' btn--' + size()"
        [attr.aria-label]="ariaLabel() || null"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else if (href(); as anchor) {
      <a
        [href]="anchor"
        class="btn"
        [class]="'btn--' + variant() + ' btn--' + size()"
        [attr.aria-label]="ariaLabel() || null"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <button
        [type]="type()"
        class="btn"
        [class]="'btn--' + variant() + ' btn--' + size()"
        [attr.aria-label]="ariaLabel() || null"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </button>
    }

    <ng-template #content>
      <span class="btn__label"><ng-content /></span>
      <span class="btn__arrow" aria-hidden="true">→</span>
    </ng-template>
  `,
  styleUrl: './button.scss',
  host: {
    class: 'app-button',
    '[class.is-full]': 'full()',
  },
  imports: [NgTemplateOutlet, RouterLink],
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'gold' | 'on-dark'>('primary');
  readonly size = input<'md' | 'lg'>('md');
  /** Ruta del router. Tiene prioridad sobre `href`. */
  readonly link = input<string>();
  /** Ancla a la que saltar tras navegar con `link`. */
  readonly fragment = input<string>();
  readonly href = input<string>();
  readonly ariaLabel = input<string>();
  /** Tipo del `<button>` (ignorado cuando se renderiza como enlace). */
  readonly type = input<'button' | 'submit'>('button');
  /** Ocupa todo el ancho disponible. */
  readonly full = input(false);
}
