import {
  Injectable,
  computed,
  inject,
  signal,
  afterNextRender,
} from '@angular/core';
import { StorageService } from './storage.service';
import { Session, Role } from '../models/auth.model';

/**
 * Sesión demostrativa (sin backend). El login no valida credenciales:
 * cualquier usuario/contraseña + rol crea una sesión que se persiste en
 * LocalStorage vía StorageService.
 *
 * La rehidratación ocurre en `afterNextRender` (solo browser) para evitar
 * desajustes de hidratación: el servidor renderiza "no autenticado" y el
 * cliente adopta la sesión guardada tras montar.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly KEY = 'session';

  private readonly storage = inject(StorageService);
  private readonly _session = signal<Session | null>(null);

  /** Sesión actual (o null). */
  readonly session = this._session.asReadonly();
  readonly isLoggedIn = computed(() => this._session() !== null);
  readonly role = computed<Role | null>(() => this._session()?.role ?? null);
  readonly username = computed(() => this._session()?.username ?? null);

  constructor() {
    afterNextRender(() => {
      const saved = this.storage.get<Session>(AuthService.KEY);
      if (saved?.username && saved.role) this._session.set(saved);
    });
  }

  /** Inicia sesión simulada y la persiste. */
  login(username: string, role: Role): void {
    const session: Session = {
      username: username.trim(),
      role,
      loggedAt: new Date().toISOString(),
    };
    this._session.set(session);
    this.storage.set(AuthService.KEY, session);
  }

  /** Cierra sesión y limpia el almacenamiento. */
  logout(): void {
    this._session.set(null);
    this.storage.remove(AuthService.KEY);
  }
}
