import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace CommonValidators {
  export function inUseKeyValidator(
    inUseKey: string[],
    currentKey: string | undefined | null
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (inUseKey.includes(control.value)) {
        if (control.value === currentKey) {
          return null;
        }
        return { inUse: true };
      }

      return null;
    };
  }
}
