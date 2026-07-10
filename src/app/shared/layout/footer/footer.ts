import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FOUNDATION,
  LANDING_NAV,
  MUNICIPALITIES,
  SOCIAL_LINKS,
} from '../../../core/data/site.data';

/**
 * Pie de página institucional. El sitio es una sola página, así que sus enlaces
 * son anclas a las secciones de la landing.
 */
@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  protected readonly foundation = FOUNDATION;
  protected readonly navLinks = LANDING_NAV;
  protected readonly municipalities = MUNICIPALITIES;
  protected readonly socials = SOCIAL_LINKS;
  protected readonly year = new Date().getFullYear();
}
