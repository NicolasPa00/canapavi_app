import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { ModalComponent } from '../../../shared/ui/modal/modal';
import { ButtonComponent } from '../../../shared/ui/button/button';
import { ROLES } from '../../../core/models/auth.model';

/**
 * Aviso de "en construcción" para el acceso.
 *
 * El sitio es un prototipo: la autenticación todavía no existe, y este modal
 * lo dice explícitamente en vez de simular un login que no lleva a ninguna
 * parte. `AuthService` y `RoleSelectorComponent` siguen en el repo porque son
 * la base de la pantalla real; aquí solo se anuncian los roles que llegarán.
 */
@Component({
  selector: 'app-login-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss',
  imports: [ModalComponent, ButtonComponent],
})
export class LoginModalComponent {
  readonly open = input(false);
  readonly close = output<void>();

  /** Roles previstos para el acceso, sólo a título informativo. */
  protected readonly roles = ROLES;

  /** Teclas ya colocadas de la marimba (las que sí están construidas). */
  protected readonly placedBars = [
    'M26 44 L40 42 L44 54 L30 56 Z',
    'M44 41 L58 39 L62 51 L48 53 Z',
    'M62 38 L76 36 L80 48 L66 50 Z',
  ];

  /** Teclas que faltan por tallar: se dibujan con trazo discontinuo. */
  protected readonly missingBars = [
    'M80 35 L94 33 L98 45 L84 47 Z',
    'M98 32 L112 30 L116 42 L102 44 Z',
  ];

  protected onClose(): void {
    this.close.emit();
  }
}
