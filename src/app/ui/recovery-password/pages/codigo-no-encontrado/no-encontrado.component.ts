import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Component({
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.scss',
})
export class NoEncontradoComponent {
  public enviroment = environment;
}
