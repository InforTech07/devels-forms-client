import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-error-message',
    template:`
            @if (errorMessage) {
                <div class="font-regular text-12 leading-18 -tracking-0-5 text-red-500">
                    {{ errorMessage}}
                </div>
            }
        `
})
export class ErrorMessageComponent {
  @Input() control: AbstractControl | null = null;

  get errorMessage(): string | null {
    if (this.control && this.control.touched && this.control.errors) {
      if (this.control.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (this.control.errors['minlength']) {
        const requiredLength = this.control.errors['minlength'].requiredLength;
        return `Debe tener al menos ${requiredLength} caracteres`;
      }
      if (this.control.errors['maxlength']) {
        const maxLength = this.control.errors['maxlength'].requiredLength;
        return `No debe exceder de ${maxLength} caracteres`;
      }
      if (this.control.errors['email']) {
        return 'Debe ser un email válido';
      }
      if (this.control.errors['pattern']) {
        return 'Formato no válido';
      }
      // Puedes agregar más validaciones aquí según las que necesites manejar.
    }
    return null;
  }
}
