import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PROJECTS } from '../../../core/data/projects.data';
import { SectionHeadingComponent } from '../../../shared/ui/section-heading/section-heading';
import { BadgeComponent } from '../../../shared/ui/badge/badge';
import { RevealOnScrollDirective } from '../../../core/directives/reveal-on-scroll.directive';

/** Sección "Proyectos" (id="proyectos"): tres procesos destacados. */
@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, BadgeComponent, RevealOnScrollDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;
}
