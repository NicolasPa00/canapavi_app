import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { FOUNDATION, SOCIAL_LINKS } from '../../../core/data/site.data';
import { SectionHeadingComponent } from '../../../shared/ui/section-heading/section-heading';
import { ButtonComponent } from '../../../shared/ui/button/button';
import { RevealOnScrollDirective } from '../../../core/directives/reveal-on-scroll.directive';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Sección "Contacto" (id="contacto"). Formulario ilustrativo sin backend:
 * valida en el cliente y guarda el último mensaje en LocalStorage.
 */
@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, ButtonComponent, RevealOnScrollDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  private readonly storage = inject(StorageService);

  protected readonly foundation = FOUNDATION;
  protected readonly socials = SOCIAL_LINKS;

  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly subject = signal('');
  protected readonly message = signal('');
  protected readonly errors = signal<ContactErrors>({});
  protected readonly success = signal(false);

  protected set(field: 'name' | 'email' | 'subject' | 'message', value: string): void {
    this[field].set(value);
  }

  protected submit(event: Event): void {
    event.preventDefault();
    const errors: ContactErrors = {};

    if (!this.name().trim()) errors.name = 'Ingresa tu nombre.';
    if (!this.email().trim()) errors.email = 'Ingresa tu correo.';
    else if (!EMAIL_RE.test(this.email().trim())) errors.email = 'El correo no es válido.';
    if (!this.message().trim()) errors.message = 'Escribe tu mensaje.';

    this.errors.set(errors);
    if (Object.keys(errors).length > 0) {
      this.success.set(false);
      return;
    }

    this.storage.set('contact:last', {
      name: this.name().trim(),
      email: this.email().trim(),
      subject: this.subject().trim(),
      message: this.message().trim(),
      at: new Date().toISOString(),
    });

    this.success.set(true);
    this.name.set('');
    this.email.set('');
    this.subject.set('');
    this.message.set('');
  }
}
