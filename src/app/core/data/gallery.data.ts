/** Galería del territorio. Imágenes reales de `public/`, cargadas en diferido. */

import type { AppImage } from './image.model';

export interface GalleryItem extends AppImage {
  readonly id: string;
  readonly caption: string;
  readonly category: string;
}

export const GALLERY: readonly GalleryItem[] = [
  {
    id: 'saberes',
    src: '/manos_rostro_libro.jpeg',
    width: 2048,
    height: 2048,
    alt: 'Manos que sostienen una flor de hibisco, un rostro con flores en el cabello y unas manos abrazando un libro azul.',
    caption: 'Lo que se hereda: la flor, el rostro y la palabra',
    category: 'Memoria',
  },
  {
    id: 'paisaje',
    src: '/paisaje.jpeg',
    width: 2752,
    height: 1536,
    alt: 'Atardecer sobre el manglar: palmeras, casas de madera sobre pilotes y una marimba junto al agua.',
    caption: 'Atardecer sobre el manglar',
    category: 'Paisaje',
  },
  {
    id: 'instrumentos',
    src: '/instrumentos_musicales.jpeg',
    width: 2048,
    height: 2048,
    alt: 'Ilustración de un cununo de madera con cuerdas tensoras y un guasá decorado con motivos geométricos.',
    caption: 'Cununo y guasá, el pulso del Pacífico',
    category: 'Instrumentos',
  },
  {
    id: 'siluetas',
    src: '/siluetas.jpeg',
    width: 2048,
    height: 2048,
    alt: 'Dos siluetas de mujeres en acuarela azul: una alza el brazo y otra baila abriendo la falda.',
    caption: 'El cuerpo también canta',
    category: 'Danza',
  },
  {
    id: 'sol-lago',
    src: '/sol_lago.jpeg',
    width: 2048,
    height: 2048,
    alt: 'Un sol de acuarela naranja junto a un río azul salpicado de estrellas.',
    caption: 'El sol y el río estrellado',
    category: 'Naturaleza',
  },
];
