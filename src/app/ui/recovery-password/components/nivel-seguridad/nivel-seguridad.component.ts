import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nivel-seguridad',
  templateUrl: './nivel-seguridad.component.html',
  styleUrls: ['./nivel-seguridad.component.css']
})
export class NivelSeguridadComponent implements OnChanges {
  @Input() password: string|null = '';
  public passwordStrength: string = '';
  public message = 'La contraseña debe contener al menos 8 caracteres, números, letras minúsculas, letras mayúsculas y símbolos';
  public messages:string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password'] && changes['password'].currentValue) {
      this.checkPasswordStrength(changes['password'].currentValue);
    }
  }

    checkPasswordStrength(password: string): void {
      //limpiamos el mensaje
      this.messages = ['Contiene: '];

      //si la contraseña es vacía, ponemos el mensaje por defecto
      console.log(password);
      if (password === '') {
        this.passwordStrength = '';
        this.message = 'La contraseña debe contener al menos 8 caracteres, letras diferentes, números, letras minúsculas, letras mayúsculas y símbolos';
        return;
      }
      
      const criteria = [
        { regex: /.{8,}/, message: '8 caracteres' },
        { regex: /^(?:([a-zA-Z0-9!@#$%^&*(),.?":{}|<>])\1?(?!\1))*$/, message: 'letras diferentes' },
        { regex: /[0-9]/, message: 'números' },
        { regex: /[a-z]/, message: 'letras minúsculas' },
        { regex: /[A-Z]/, message: 'letras mayúsculas' },
        { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'símbolos' }
      ];

      let strength = 0;
      criteria.forEach((criterion) => {
        if (criterion.regex.test(password)) {
          strength++;
          this.messages.push(criterion.message);
        }
      });
      this.message = this.messages.join(', ').replace('Contiene: ,', 'Contiene: ');


      this.passwordStrength = ((strength / criteria.length) * 100).toString();
    }
  }
