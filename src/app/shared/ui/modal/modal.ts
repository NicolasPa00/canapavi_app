import {
  Component,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
  input,
  output,
  effect,
  viewChild,
  ElementRef,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/**
 * Shell de modal accesible y reutilizable.
 * - role="dialog" + aria-modal, cierre con Esc y clic en el overlay.
 * - Focus-trap (Tab/Shift+Tab) y restauración del foco al cerrar.
 * - Bloquea el scroll del body mientras está abierto.
 * El contenido se proyecta con <ng-content>.
 */
@Component({
  selector: 'app-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent {
  readonly open = input(false);
  readonly labelledby = input<string>();
  readonly size = input<'md' | 'lg'>('md');
  readonly close = output<void>();

  private readonly dialog = viewChild<ElementRef<HTMLElement>>('dialog');
  private readonly platformId = inject(PLATFORM_ID);
  private readonly doc = inject(DOCUMENT);
  private previouslyFocused: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const isOpen = this.open();
      if (!isPlatformBrowser(this.platformId)) return;

      const body = this.doc.body;
      if (isOpen) {
        this.previouslyFocused = this.doc.activeElement as HTMLElement | null;
        body.style.overflow = 'hidden';
        this.dialog()?.nativeElement.focus();
      } else {
        body.style.overflow = '';
        this.previouslyFocused?.focus?.();
        this.previouslyFocused = null;
      }
    });
  }

  protected requestClose(): void {
    this.close.emit();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.requestClose();
      return;
    }
    if (event.key !== 'Tab') return;

    const el = this.dialog()?.nativeElement;
    if (!el) return;

    const focusables = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = this.doc.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
