import {
  Component,
  ChangeDetectionStrategy,
  model,
  viewChildren,
  ElementRef,
} from '@angular/core';
import { ROLES, Role } from '../../../core/models/auth.model';

/**
 * Selector de rol accesible (patrón radiogroup con roving tabindex y
 * navegación por flechas). Two-way binding vía `selected`.
 */
@Component({
  selector: 'app-role-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './role-selector.html',
  styleUrl: './role-selector.scss',
})
export class RoleSelectorComponent {
  readonly selected = model<Role | null>(null);

  protected readonly roles = ROLES;
  private readonly options = viewChildren<ElementRef<HTMLButtonElement>>('opt');

  protected select(role: Role): void {
    this.selected.set(role);
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    const count = this.roles.length;
    const next = (index + (forward ? 1 : -1) + count) % count;

    this.select(this.roles[next].id);
    this.options()[next]?.nativeElement.focus();
  }
}
