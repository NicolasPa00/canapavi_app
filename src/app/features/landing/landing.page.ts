import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/layout/navbar/navbar';
import { FooterComponent } from '../../shared/layout/footer/footer';
import { RibbonComponent } from '../../shared/ui/ribbon/ribbon';
import { HeroComponent } from '../sections/hero/hero';
import { PillarsComponent } from '../sections/pillars/pillars';
import { ProofComponent } from '../sections/proof/proof';
import { StrategicLinesComponent } from '../sections/strategic-lines/strategic-lines';
import { ProjectsComponent } from '../sections/projects/projects';
import { GalleryComponent } from '../sections/gallery/gallery';
import { ContactComponent } from '../sections/contact/contact';
import { LoginModalComponent } from '../auth/login-modal/login-modal';
import { LANDING_NAV, LANDING_SECTION_IDS } from '../../core/data/site.data';

/**
 * Landing de una sola página. Contenido curado, no exhaustivo:
 *
 *   hero → propósito → impacto → líneas → proyectos → galería → contacto
 *
 * Las secciones alternan banda cálida y banda verde profunda (`.band--dark`)
 * para que el ojo las separe. `.band--dark` no reestiliza nada: redefine los
 * tokens semánticos y las secciones se invierten solas.
 *
 * Los `<app-ribbon>` son los lazos que enlazan una sección con la siguiente:
 * `from` es el fondo de la sección de arriba y `to` el de la de abajo. Si
 * cambias el fondo de una sección o su banda, actualiza los dos lazos que la
 * rodean o la costura se verá.
 */
@Component({
  selector: 'app-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    FooterComponent,
    RibbonComponent,
    HeroComponent,
    PillarsComponent,
    ProofComponent,
    StrategicLinesComponent,
    ProjectsComponent,
    GalleryComponent,
    ContactComponent,
    LoginModalComponent,
  ],
  template: `
    <a class="skip-link" href="#contenido">Saltar al contenido</a>

    <app-navbar [links]="navLinks" [spyIds]="spyIds" (login)="loginOpen.set(true)" />

    <main id="contenido">
      <app-hero />
      <app-ribbon from="var(--c-sand)" to="var(--c-forest)" />

      <div class="band band--dark"><app-pillars /></div>
      <app-ribbon from="var(--c-forest)" to="var(--c-paper)" />

      <div class="band"><app-proof /></div>
      <app-ribbon from="var(--c-paper)" to="var(--c-forest)" />

      <div class="band band--dark"><app-strategic-lines /></div>
      <app-ribbon from="var(--c-forest)" to="var(--c-paper)" />

      <div class="band"><app-projects /></div>
      <app-ribbon from="var(--c-paper)" to="var(--c-forest)" />

      <div class="band band--dark"><app-gallery /></div>
      <app-ribbon from="var(--c-forest)" to="var(--c-paper)" />

      <div class="band"><app-contact /></div>
    </main>

    <app-ribbon from="var(--c-paper)" to="var(--c-jungle)" />
    <app-footer />

    <app-login-modal [open]="loginOpen()" (close)="loginOpen.set(false)" />
  `,
})
export class LandingPage {
  protected readonly navLinks = LANDING_NAV;
  protected readonly spyIds = LANDING_SECTION_IDS;

  /** Visibilidad del modal de login. */
  protected readonly loginOpen = signal(false);
}
