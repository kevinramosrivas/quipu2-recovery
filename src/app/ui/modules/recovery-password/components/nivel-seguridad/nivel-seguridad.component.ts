import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nivel-seguridad',
  templateUrl: './nivel-seguridad.component.html',
  styleUrls: ['./nivel-seguridad.component.css']
})
export class NivelSeguridadComponent implements OnChanges {
  @Input() password: string = '';
  passwordStrength: string = ''; // Variable para almacenar el estado de la barra de seguridad

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password'] && changes['password'].currentValue) {
      this.checkPasswordStrength(changes['password'].currentValue);
    }
  }

  checkPasswordStrength(password: string): void {
    const criteria = [
      { regex: /.{8,}/, message: 'at least 8 characters' },
      { regex: /[0-9]/, message: 'contains numbers' },
      { regex: /[a-zA-Z]/, message: 'contains letters' },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'contains symbols' }
    ];

    const passedCriteria = criteria.filter(criterion => criterion.regex.test(password)).length;

    // Asignamos la clase de acuerdo al nivel de seguridad de la contraseña
    switch (passedCriteria) {
      case 0:
      case 1:
        this.passwordStrength = 'weak';  // Contraseña débil
        break;
      case 2:
        this.passwordStrength = 'medium';  // Contraseña media
        break;
      case 3:
      case 4:
        this.passwordStrength = 'strong';  // Contraseña fuerte
        break;
      default:
        this.passwordStrength = '';  // Contraseña débil
    }
  }
}
