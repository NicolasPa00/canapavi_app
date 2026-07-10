import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Capa de persistencia sobre LocalStorage, segura para SSR.
 *
 * En el servidor (prerender) `localStorage` no existe: todos los métodos
 * degradan a no-op / valor por defecto sin lanzar errores. Toda la app
 * accede al almacenamiento a través de este servicio, nunca directamente.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** Prefijo de namespace para no colisionar con otras claves del dominio. */
  private readonly prefix = 'canapavi:';

  /** Indica si el almacenamiento persistente está disponible. */
  get available(): boolean {
    return this.isBrowser;
  }

  /** Lee y deserializa un valor. Devuelve `fallback` si no existe o falla. */
  get<T>(key: string, fallback: T | null = null): T | null {
    if (!this.isBrowser) return fallback;
    try {
      const raw = localStorage.getItem(this.prefix + key);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  }

  /** Serializa y guarda un valor. */
  set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch {
      // Cuota llena o modo privado: se ignora silenciosamente.
    }
  }

  /** Elimina una clave. */
  remove(key: string): void {
    if (!this.isBrowser) return;
    try {
      localStorage.removeItem(this.prefix + key);
    } catch {
      /* no-op */
    }
  }

  /** Elimina todas las claves del namespace CANAPAVI. */
  clearNamespace(): void {
    if (!this.isBrowser) return;
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(this.prefix))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      /* no-op */
    }
  }
}
