import {
  Component,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
  input,
  signal,
  output,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LANDING_NAV,
  LANDING_SECTION_IDS,
  type NavLink,
} from '../../../core/data/site.data';
import { roleLabel } from '../../../core/models/auth.model';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../ui/button/button';

/**
 * Barra de navegación fija.
 * - Se vuelve "glass" al hacer scroll.
 * - Resalta la sección activa (scroll-spy con IntersectionObserver).
 * - Menú móvil accesible (aria-expanded / aria-controls).
 * - Emite `login` para que la página abra el modal.
 */
@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [ButtonComponent, RouterLink],
})
export class NavbarComponent implements OnDestroy {
  readonly login = output<void>();

  /** Enlaces del menú: anclas ('#seccion') o, si empiezan por '/', rutas. */
  readonly links = input<readonly NavLink[]>(LANDING_NAV);

  /** Ids de sección observados por el scroll-spy. */
  readonly spyIds = input<readonly string[]>(LANDING_SECTION_IDS);

  protected readonly auth = inject(AuthService);
  protected readonly roleLabel = roleLabel;

  protected readonly scrolled = signal(false);
  protected readonly mobileOpen = signal(false);
  protected readonly activeHref = signal('');

  /** Un enlace es de router si apunta a una ruta, no a un ancla. */
  protected isRoute(href: string): boolean {
    return href.startsWith('/');
  }

  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private detachScroll?: () => void;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const onScroll = () => this.scrolled.set(window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.detachScroll = () => window.removeEventListener('scroll', onScroll);

      if (typeof IntersectionObserver !== 'undefined') {
        this.observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) this.activeHref.set(`#${entry.target.id}`);
            }
          },
          { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
        );
        // Los inputs ya están resueltos aquí: afterNextRender corre tras el
        // primer render, no en el constructor.
        for (const id of this.spyIds()) {
          const el = document.getElementById(id);
          if (el) this.observer.observe(el);
        }
      }
    });
  }

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }

  protected onLogin(): void {
    this.closeMobile();
    this.login.emit();
  }

  protected logout(): void {
    this.closeMobile();
    this.auth.logout();
  }

  /** Inicial del usuario para el avatar. */
  protected initial(): string {
    return this.auth.username()?.charAt(0).toUpperCase() ?? '';
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.detachScroll?.();
  }
}
