import { AbstractControl, FormArray, FormGroup, FormSubmittedEvent, ValidationErrors } from "@angular/forms";

export class FormUtils {

  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static onlyNumbersPattern = /^(?!0$)\d+$/;
  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Este campo debe ser mayor a ${errors['min'].min}`;
        case 'email':
          return 'El formato del email es incorrecto';
        case 'pattern':
           if (errors['pattern'].requiredPattern === FormUtils.namePattern) {
            return 'El formato de este campo debe contener un nombre y apellido';
          }
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El formato del email es incorrecto';
          }
          if (errors['pattern'].requiredPattern === FormUtils.onlyNumbersPattern.toString()) {
            return 'El rol seleccionado no es válido';
          }

          return 'Error de patron contra expresion regular';
        default:
          return 'Error de validacion no controlado'
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName])
      return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);

  }



}
