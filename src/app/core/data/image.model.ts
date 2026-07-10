/**
 * Imagen de `public/`. `width`/`height` son las dimensiones intrínsecas del
 * archivo: hacen falta en el `<img>` para reservar el hueco y evitar CLS.
 */
export interface AppImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}
