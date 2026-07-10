import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export type BadgeStatus = 'active' | 'open' | 'closed' | 'neutral';

/** Etiqueta de estado (proyectos, convocatorias, procesos). */
@Component({
  selector: 'app-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge" [class]="'badge--' + status()">
      <span class="badge__dot" aria-hidden="true"></span>
      <ng-content />
    </span>
  `,
  styleUrl: './badge.scss',
})
export class BadgeComponent {
  readonly status = input<BadgeStatus>('neutral');
}
