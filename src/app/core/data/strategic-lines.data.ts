/** Líneas estratégicas de la fundación. `icon` mapea a un SVG en la plantilla. */

export type LineIcon = 'research' | 'education' | 'community' | 'culture' | 'voices';

export interface StrategicLine {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: LineIcon;
}

export const STRATEGIC_LINES: readonly StrategicLine[] = [
  {
    id: 'investigacion',
    title: 'Investigación',
    description:
      'Investigación participativa que documenta saberes, cantos y memoria colectiva junto a las comunidades.',
    icon: 'research',
  },
  {
    id: 'etnoeducacion',
    title: 'Etnoeducación',
    description:
      'Procesos pedagógicos con enfoque territorial para transmitir la cultura a las nuevas generaciones.',
    icon: 'education',
  },
  {
    id: 'procesos',
    title: 'Procesos comunitarios',
    description:
      'Acompañamiento permanente a organizaciones y liderazgos para el fortalecimiento del tejido social.',
    icon: 'community',
  },
  {
    id: 'gestion',
    title: 'Gestión cultural',
    description:
      'Diseño y gestión de proyectos, eventos y convocatorias que dinamizan la vida cultural del Pacífico.',
    icon: 'culture',
  },
  {
    id: 'cantadoras',
    title: 'Red de Cantadoras',
    description:
      'Una red viva de cantadoras y sabedoras que sostienen el canto tradicional como patrimonio.',
    icon: 'voices',
  },
];
