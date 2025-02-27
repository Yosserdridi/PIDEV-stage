import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateGreaterThan(startDate: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = control.root.get(startDate);
    if (start && control.value) {
      return new Date(control.value) > new Date(start.value) ? null : { endDateLessThanStartDate: true };
    }
    return null;
  };
}
