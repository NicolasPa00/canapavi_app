/**
 * Información institucional estática y navegación de la landing.
 * Sin backend: esta es la "fuente de verdad" del sitio.
 */

export interface NavLink {
  readonly label: string;
  /** Ancla de la página actual ('#seccion') o, si empieza por '/', ruta del router. */
  readonly href: string;
}

/** Navbar de la landing: todo el sitio vive en una sola página. */
export const LANDING_NAV: readonly NavLink[] = [
  { label: 'Qué hacemos', href: '#proposito' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Líneas', href: '#lineas' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

/** Ids de sección, en orden, para el scroll-spy. */
export const LANDING_SECTION_IDS: readonly string[] = [
  'inicio',
  'proposito',
  'impacto',
  'lineas',
  'proyectos',
  'galeria',
  'contacto',
];

export const FOUNDATION = {
  shortName: 'CANAPAVI',
  fullName: 'Fundación Cultura Nariñense para el Rescate de los Valores e Identidad',
  tagline: 'Cultura, memoria e identidad del Pacífico',
  email: 'contacto@canapavi.org',
  phone: '+57 320 000 0000',
  location: 'Nariño · Pacífico Sur, Colombia',
  foundedYear: 2016,
} as const;

/** Municipios donde trabaja la fundación (Pacífico Sur). */
export const MUNICIPALITIES: readonly string[] = [
  'Tumaco',
  'Barbacoas',
  'Guapi',
  'Timbiquí',
  'Mosquera',
  'Francisco Pizarro',
  'Olaya Herrera',
  'El Charco',
  'Iscuandé',
];

export interface SocialLink {
  readonly label: string;
  readonly url: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'Instagram', url: '#' },
  { label: 'Facebook', url: '#' },
  { label: 'YouTube', url: '#' },
];
