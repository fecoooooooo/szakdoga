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

  export function validatePasswordMatch(
    comparedControl: AbstractControl
  ): ValidatorFn {
    return (actualControl: AbstractControl): ValidationErrors | null => {
      const actualPassword = actualControl.value as string;
      const comparedPassword = comparedControl.value as string;

      if (actualPassword !== comparedPassword) {
        return { differentPasswords: true };
      }

      return null;
    };
  }
}
