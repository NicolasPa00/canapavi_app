/**
 * Contenido de los primeros bloques de la landing (hero → propósito → impacto).
 *
 * El sitio es una sola página: el criterio no es la exhaustividad sino que cada
 * sección se entienda de un vistazo. Frases cortas, una idea por pilar.
 */

/** Icono de pilar: se dibuja en SVG (ver pillars.html), no se carga como imagen. */
export type PillarIcon = 'libro' | 'manos' | 'rio';

export interface Pillar {
  readonly icon: PillarIcon;
  readonly title: string;
  readonly line: string;
}

export const PILLARS: readonly Pillar[] = [
  {
    icon: 'libro',
    title: 'Memoria',
    line: 'Recogemos la tradición oral que se hereda.',
  },
  {
    icon: 'manos',
    title: 'Comunidad',
    line: 'Acompañamos procesos desde y con el territorio.',
  },
  {
    icon: 'rio',
    title: 'Territorio',
    line: 'Investigamos el patrimonio del río y el manglar.',
  },
];

/** Las cuatro cifras que sostienen la evidencia social (subconjunto de IMPACT_STATS). */
export interface ProofStat {
  readonly value: number;
  readonly prefix?: string;
  readonly label: string;
}

export const PROOF_STATS: readonly ProofStat[] = [
  { value: 9, label: 'municipios del Pacífico' },
  { value: 12, prefix: '+', label: 'cantadoras aliadas' },
  { value: 45, prefix: '+', label: 'procesos comunitarios' },
  { value: 1800, prefix: '+', label: 'personas participantes' },
];

export const PROOF_QUOTE = {
  quote: 'Aquí volvimos a cantar lo que nuestras abuelas cantaban.',
  author: 'Doña Rosalba',
  role: 'cantadora de Guapi',
} as const;
