import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nivel-seguridad',
  templateUrl: './nivel-seguridad.component.html',
  styleUrl: './nivel-seguridad.component.css'
})
export class NivelSeguridadComponent implements OnChanges{
  @Input() password: string = '';
  passwordStrength: string = ''; // Variable para almacenar el estado de la barra de seguridad
  
  
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['password'].currentValue){
      this.checkPasswordStrength(changes['password'].currentValue)
    }
  }
  checkPasswordStrength(password: string): void {
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /[0-9]/.test(password);
    const letterCriteria = /[a-zA-Z]/.test(password);
    const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;

    if (lengthCriteria) strength++;  // Al menos 8 caracteres
    if (numberCriteria) strength++;  // Contiene números
    if (letterCriteria) strength++;  // Contiene letras
    if (symbolCriteria) strength++;  // Contiene símbolos

    // Asignamos la clase de acuerdo al nivel de seguridad de la contraseña
    if (strength === 0) {
      this.passwordStrength = '';  // Contraseña débil
    } else if (strength === 1) {
      this.passwordStrength = 'weak';  // Contraseña débil
    } else if (strength === 2) {
      this.passwordStrength = 'medium';  // Contraseña media
    } else {
      this.passwordStrength = 'strong';  // Contraseña fuerte
    }
  }
}
