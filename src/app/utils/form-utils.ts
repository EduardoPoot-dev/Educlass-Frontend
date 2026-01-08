import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  // Expresiones regulares
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  static getTextError(el: AbstractControl) {
    const errors = el.errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'notEqual':
          return 'Los passwords no coinciden'

        case 'notInfo':
          return 'Este campo es obligatorio'

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'Email no válido'
          }
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName];

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static hasInfoFileInputValidator(control: AbstractControl ) {
    return !!(control.value as FormData).get('file') ? null : {notInfo: true}
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index];

    return FormUtils.getTextError(errors);
  }

  static equalValidator = (field1: string, field2: string) => {
    return (control: AbstractControl) => {
      const field1Data = control.get(field1)?.value
      const field2Data = control.get(field2)?.value
      return field1Data === field2Data ? null : {notEqual: true}
    }
  }
}
