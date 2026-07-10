/**
 * Proyectos destacados. La landing muestra sólo tres: el objetivo es que el
 * visitante entienda el trabajo de un vistazo, no que lo lea entero.
 */

import type { BadgeStatus } from '../../shared/ui/badge/badge';
import type { AppImage } from './image.model';

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly status: BadgeStatus;
  readonly statusLabel: string;
  readonly location: string;
  readonly year: string;
  readonly tags: readonly string[];
  readonly image: AppImage;
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'oi-mujeres-cantan',
    title: 'Oí, cuando las mujeres cantan',
    summary: 'Doce cantadoras tejen voces, memoria y territorio.',
    status: 'active',
    statusLabel: 'En curso',
    location: 'Pacífico Sur',
    year: '2025',
    tags: ['Cantadoras', 'Memoria'],
    image: {
      src: '/bailarina_2.png',
      width: 853,
      height: 1604,
      alt: 'Silueta en acuarela azul de una mujer bailando y abriendo su falda floreada.',
    },
  },
  {
    id: 'territorio-sonoro-marimba',
    title: 'Territorio Sonoro de la Marimba',
    summary: 'Enseñanza del canto y salvaguardia del patrimonio.',
    status: 'active',
    statusLabel: 'En curso',
    location: 'Varios municipios',
    year: '2024–2025',
    tags: ['Marimba', 'Pedagogía'],
    image: {
      src: '/marimba.jpeg',
      width: 2048,
      height: 2048,
      alt: 'Ilustración de una marimba de chonta con sus tubos de bambú decorados y dos baquetas.',
    },
  },
  {
    id: 'lideresas-por-la-paz',
    title: 'Lideresas por la Paz',
    summary: 'Mujeres líderes que transforman su comunidad.',
    status: 'open',
    statusLabel: 'Convocatoria abierta',
    location: 'Nariño',
    year: '2025',
    tags: ['Mujeres', 'Liderazgo'],
    image: {
      src: '/manos.png',
      width: 882,
      height: 914,
      alt: 'Dos manos abiertas en acuarela naranja sosteniendo una flor de hibisco.',
    },
  },
];
