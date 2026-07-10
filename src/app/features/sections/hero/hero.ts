import {
  Component,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
  signal,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../../../shared/ui/button/button';
import { RevealOnScrollDirective } from '../../../core/directives/reveal-on-scroll.directive';

/**
 * Hero (id="inicio"). Impacto visual + mensaje central + un único CTA.
 *
 * El parallax mueve solo el sol de fondo; la ronda de cantadoras queda quieta
 * para no competir con el titular. Seguro para SSR y prefers-reduced-motion.
 */
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  imports: [ButtonComponent, RevealOnScrollDirective],
})
export class HeroComponent implements OnDestroy {
  /** Desplazamiento de parallax en px (aplicado al sol). */
  protected readonly parallax = signal(0);

  private readonly platformId = inject(PLATFORM_ID);
  private detach?: () => void;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const onScroll = () => {
        const y = window.scrollY;
        if (y < 900) this.parallax.set(y * 0.12);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.detach = () => window.removeEventListener('scroll', onScroll);
    });
  }

  ngOnDestroy(): void {
    this.detach?.();
  }
}
