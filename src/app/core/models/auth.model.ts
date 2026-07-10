/** Roles simulados del acceso demostrativo (sin backend). */
export type Role = 'admin' | 'investigador' | 'gestor' | 'visitante';

export interface RoleOption {
  readonly id: Role;
  readonly label: string;
  readonly description: string;
}

/** Catálogo de roles mostrado en el selector del modal. */
export const ROLES: readonly RoleOption[] = [
  {
    id: 'admin',
    label: 'Administrador',
    description: 'Gestión integral de la plataforma y contenidos.',
  },
  {
    id: 'investigador',
    label: 'Investigador',
    description: 'Acceso a publicaciones, archivos y memoria.',
  },
  {
    id: 'gestor',
    label: 'Gestor Cultural',
    description: 'Coordinación de procesos, eventos y comunidades.',
  },
  {
    id: 'visitante',
    label: 'Visitante',
    description: 'Exploración abierta de la fundación.',
  },
];

/** Sesión persistida en LocalStorage. */
export interface Session {
  readonly username: string;
  readonly role: Role;
  readonly loggedAt: string; // ISO
}

/** Etiqueta legible de un rol. */
export function roleLabel(role: Role): string {
  return ROLES.find((r) => r.id === role)?.label ?? role;
}
