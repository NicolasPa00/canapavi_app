import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  inject,
  input,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Anima un número desde 0 hasta el valor objetivo cuando entra en viewport.
 *
 * Uso:  <span [appCountUp]="120" suffix="+"></span>
 *       <span [appCountUp]="12" [duration]="1400"></span>
 *
 * SSR: renderiza el valor final (bueno para SEO y para no-JS). Con movimiento
 * reducido, escribe el valor final sin animar.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnDestroy {
  /** Valor final a alcanzar. */
  readonly target = input.required<number>({ alias: 'appCountUp' });

  /** Texto pospuesto (p. ej. '+', '%', 'K'). */
  readonly suffix = input('');

  /** Texto antepuesto. */
  readonly prefix = input('');

  /** Duración de la animación en ms. */
  readonly duration = input(1600);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private frame?: number;

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;

      if (!isPlatformBrowser(this.platformId)) {
        el.textContent = this.format(this.target());
        return;
      }

      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || typeof IntersectionObserver === 'undefined') {
        el.textContent = this.format(this.target());
        return;
      }

      // Empieza en 0 para que la animación tenga recorrido.
      el.textContent = this.format(0);

      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.observer?.disconnect();
            this.animate(el);
          }
        },
        { threshold: 0.4 },
      );
      this.observer.observe(el);
    });
  }

  private animate(el: HTMLElement): void {
    const end = this.target();
    const dur = this.duration();
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = this.format(Math.round(end * eased));
      if (t < 1) this.frame = requestAnimationFrame(step);
    };

    this.frame = requestAnimationFrame(step);
  }

  private format(value: number): string {
    return `${this.prefix()}${value.toLocaleString('es-CO')}${this.suffix()}`;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) cancelAnimationFrame(this.frame);
  }
}
