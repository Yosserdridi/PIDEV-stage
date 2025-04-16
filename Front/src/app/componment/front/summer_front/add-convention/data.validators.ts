import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateGreaterThan(startDateField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent;
    if (!formGroup) return null;

    const startDate = formGroup.get(startDateField)?.value;
    const endDate = control.value;

    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if endDate is before startDate
    if (end < start) {
      return { beforeStart: true };
    }

    // Check if endDate is more than 5 months after startDate
    const maxEnd = new Date(start);
    maxEnd.setMonth(maxEnd.getMonth() + 5);

    if (end > maxEnd) {
      return { tooFar: true };
    }

    return null;
  };
}
