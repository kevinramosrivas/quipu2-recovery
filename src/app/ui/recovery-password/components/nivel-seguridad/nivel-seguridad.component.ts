import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nivel-seguridad',
  templateUrl: './nivel-seguridad.component.html',
  styleUrls: ['./nivel-seguridad.component.scss']
})
export class NivelSeguridadComponent implements OnChanges {
  @Input() password: string|null = '';
  public passwordStrength: string = '';
  public message = 'La contraseña debe tener 8 caracteres, números, minúsculas, mayúsculas y símbolos';
  public messages:string[] = [];
  public levelMessage = '';


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      this.checkPasswordStrength(changes['password'].currentValue);
    }
    if (changes['password'].currentValue === '') {
      this.passwordStrength = '';
      this.message = 'La contraseña debe tener 8 caracteres, números, minúsculas, mayúsculas y símbolos';
      this.levelMessage = '';
      this.passwordStrength = '0';
    }
  }

    checkPasswordStrength(password: string): void {
      //limpiamos el mensaje
      this.messages = ['Contiene: '];
      if (password === '') {
        this.passwordStrength = '';
        this.message = 'La contraseña debe contener al menos 8 caracteres, letras diferentes, números, letras minúsculas, letras mayúsculas y símbolos';
        return;
      }
      
      const criteria = [
        { regex: /.{8,}/ },
        { regex: /^(?:([a-zA-Z0-9!@#$%^&*(),.?":{}|<>])\1?(?!\1))*$/ },
        { regex: /[0-9]/},
        { regex: /[a-z]/ },
        { regex: /[A-Z]/},
        { regex: /[!@#$%^&*(),.?":{}|<>]/ }
      ];

      const strengthLevels = [
        { message: 'Muy débil', minStrength: 0},
        { message: 'Débil', minStrength: 20},
        { message: 'Aceptable', minStrength: 40},
        { message: 'Fuerte', minStrength: 60},
        { message: 'Muy fuerte', minStrength: 80}
      ];

      let strength = 0;
      criteria.forEach((criterion) => {
        if (criterion.regex.test(password)) {
          strength++;
        }
      });
      this.passwordStrength = ((strength / criteria.length) * 100).toString();

      strengthLevels.forEach((level) => {
        if (parseInt(this.passwordStrength) >= level.minStrength) {
          this.levelMessage = level.message;
        }
      });

    }
  }
