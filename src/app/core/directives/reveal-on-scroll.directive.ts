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

type RevealVariant = 'fade' | 'fade-up' | 'scale';

/**
 * Revela el elemento con una animación (fade / fade-up / scale) cuando entra
 * en el viewport, usando IntersectionObserver. Nativo, sin librerías.
 *
 * Uso:  <div appReveal>            → fade-up por defecto
 *       <div appReveal="scale">    → variante
 *       <div appReveal [revealOnce]="false">  → re-anima al salir/entrar
 *
 * SSR: no hace nada en el servidor. Si el usuario prefiere movimiento
 * reducido, el contenido se muestra de inmediato (styles.scss lo gestiona).
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[attr.data-reveal]': 'variant()',
  },
})
export class RevealOnScrollDirective implements OnDestroy {
  /**
   * Variante de animación: 'fade' | 'fade-up' | 'scale'.
   * Aceptar '' permite usar la directiva como atributo simple (`appReveal`),
   * que se normaliza a 'fade-up'.
   */
  readonly variant = input<RevealVariant, RevealVariant | ''>('fade-up', {
    alias: 'appReveal',
    transform: (value): RevealVariant => (value === '' ? 'fade-up' : value),
  });

  /** Si es true (por defecto), la animación ocurre una sola vez. */
  readonly revealOnce = input(true);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const el = this.host.nativeElement;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Sin soporte de IO o con movimiento reducido: mostrar directamente.
      if (reduce || typeof IntersectionObserver === 'undefined') {
        el.classList.add('is-visible');
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible');
              if (this.revealOnce()) this.observer?.unobserve(el);
            } else if (!this.revealOnce()) {
              el.classList.remove('is-visible');
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
      );

      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
