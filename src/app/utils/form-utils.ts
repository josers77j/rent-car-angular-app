import { AbstractControl, FormArray, FormGroup, FormSubmittedEvent, ValidationErrors } from "@angular/forms";

export class FormUtils {

  static namePattern = '^([a-zA-ZáéíóúÁÉÍÓÚñÑ]+) ([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static onlyNumbersPattern = /^(?!0$)\d+$/;

  // Patrón para No. de placa (ejemplo: P123-456)
  static platePattern = '^[A-Z]{1}[0-9]{3}-[0-9]{3}$';
  // Validación general de texto (marca, modelo, categoría, estado)
  static generalTextPattern = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\\s]+$';
  // Año mínimo (supongamos que el vehículo no puede tener más de 30 años de antigüedad)
  //static minVehicleYear = new Date().getFullYear() - 30; // Ej: si estamos en 2025, el mínimo es 1995
  //static maxVehicleYear = 2025;
  static maxVehicleYear = /^[0-9]{4}$/;  // Por ejemplo, solo años de 4 dígitos
  // Tarifa diaria: debe ser un número mayor a 0
  static dailyRatePattern = '^[1-9]\\d*$'; // Solo enteros positivos (sin ceros a la izquierda)

  static descriptionPattern = '^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,;:¡!¿?()\\s-]{10,500}$';

  static phonePattern = '^[0-9]{4}[- ]?[0-9]{4}$';

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

          if (errors['pattern'].requiredPattern === FormUtils.platePattern) {
            return 'El formato de la placa es incorrecto. Ej: P123-456';
          }
          if (errors['pattern'].requiredPattern === FormUtils.generalTextPattern) {
            return 'Este campo solo puede contener letras, números y espacios';
          }
          if (errors['pattern'].requiredPattern === FormUtils.dailyRatePattern) {
            return 'La tarifa diaria debe ser un número positivo';
          }
          if (errors['pattern'].requiredPattern === FormUtils.maxVehicleYear) {
            return 'Rango disponible hasta el 2025';
          }

          if (errors['pattern'].requiredPattern === FormUtils.descriptionPattern) {
            return 'La descripción debe tener entre 10 y 500 caracteres y solo usar letras, números y puntuación básica';
          }

          if (errors['pattern'].requiredPattern === FormUtils.phonePattern) {
            return 'Solo No. de teléfonos con exactamente 8 dígitos (sin guion, con guion o con espacio)';
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
