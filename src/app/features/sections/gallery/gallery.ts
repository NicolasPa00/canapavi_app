import {
  Component,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { GALLERY } from '../../../core/data/gallery.data';
import { SectionHeadingComponent } from '../../../shared/ui/section-heading/section-heading';
import { ModalComponent } from '../../../shared/ui/modal/modal';
import { RevealOnScrollDirective } from '../../../core/directives/reveal-on-scroll.directive';

/**
 * Sección "Galería" (id="galeria"): grid tipo masonry + lightbox accesible
 * (reutiliza ModalComponent) con navegación por botones y flechas del teclado.
 */
@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, ModalComponent, RevealOnScrollDirective],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class GalleryComponent {
  protected readonly items = GALLERY;
  protected readonly open = signal(false);
  protected readonly index = signal(0);
  protected readonly current = computed(() => this.items[this.index()]);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly doc = inject(DOCUMENT);

  constructor() {
    // Navegación con flechas mientras el lightbox está abierto.
    effect((onCleanup) => {
      if (!this.open() || !isPlatformBrowser(this.platformId)) return;

      const handler = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') this.next();
        else if (e.key === 'ArrowLeft') this.prev();
      };
      this.doc.addEventListener('keydown', handler);
      onCleanup(() => this.doc.removeEventListener('keydown', handler));
    });
  }

  protected openAt(i: number): void {
    this.index.set(i);
    this.open.set(true);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected next(): void {
    this.index.update((i) => (i + 1) % this.items.length);
  }

  protected prev(): void {
    this.index.update((i) => (i - 1 + this.items.length) % this.items.length);
  }
}
