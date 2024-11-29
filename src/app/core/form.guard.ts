import { CanDeactivateFn } from '@angular/router'
import { Observable } from 'rxjs'
import { DeactivatableComponent } from './deactivatable-component.interface'

/** Our Route Guard as a Function */
export const canDeactivateFormComponent: CanDeactivateFn<DeactivatableComponent> = (component: DeactivatableComponent) => {
    return component.canDeactivate() ?
      true :
      confirm('Changes you made may not be saved.');
}
    