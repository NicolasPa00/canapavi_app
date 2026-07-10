import { Component, ChangeDetectionStrategy, input } from '@angular/core';

/**
 * Lazo: divisor que enlaza dos secciones.
 *
 * Los lazos son uno de los temas de la fundación (ver `public/lazos.jpeg`: los
 * ríos y las cintas tejidas que conectan los pueblos). Este divisor recoge ese
 * motivo — una onda que cambia de superficie, cruzada por cintas de color— para
 * que las secciones no se lean como bloques sueltos sino como un mismo cauce.
 *
 * `from` y `to` son los colores de la sección de arriba y la de abajo:
 *
 *   <app-ribbon from="var(--c-paper)" to="var(--c-forest)" />
 */
@Component({
  selector: 'app-ribbon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ribbon" aria-hidden="true" [style.background]="from()">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
        <!-- Cauce: la superficie de la sección siguiente sube por la onda -->
        <path
          [attr.fill]="to()"
          d="M0,58 C240,110 480,10 720,44 C960,78 1200,26 1440,62 L1440,120 L0,120 Z"
        />
        <!-- Cintas tejidas que cruzan el cauce -->
        <path
          class="ribbon__band ribbon__band--leaf"
          d="M0,44 C240,96 480,-4 720,30 C960,64 1200,12 1440,48"
        />
        <path
          class="ribbon__band ribbon__band--river"
          d="M0,52 C240,104 480,4 720,38 C960,72 1200,20 1440,56"
        />
        <path
          class="ribbon__band ribbon__band--amber"
          d="M0,36 C240,88 480,-12 720,22 C960,56 1200,4 1440,40"
        />
        <path
          class="ribbon__band ribbon__band--coral"
          d="M0,29 C240,81 480,-19 720,15 C960,49 1200,-3 1440,33"
        />
      </svg>
    </div>
  `,
  styles: `
    .ribbon {
      line-height: 0;
    }

    svg {
      display: block;
      width: 100%;
      height: clamp(58px, 7vw, 120px);
    }

    .ribbon__band {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
    }

    .ribbon__band--leaf {
      stroke: var(--c-leaf);
    }
    .ribbon__band--river {
      stroke: var(--c-turquoise);
    }
    .ribbon__band--amber {
      stroke: var(--c-amber);
      stroke-width: 2.4;
    }
    .ribbon__band--coral {
      stroke: var(--c-coral);
      stroke-width: 2;
      opacity: 0.85;
    }
  `,
})
export class RibbonComponent {
  /** Color de la sección superior (fondo del divisor). */
  readonly from = input.required<string>();
  /** Color de la sección inferior (relleno de la onda). */
  readonly to = input.required<string>();
}
