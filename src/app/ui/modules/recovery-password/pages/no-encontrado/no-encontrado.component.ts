import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [],
  template: `<p>no-encontrado works!</p>`,
  styleUrl: './no-encontrado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoEncontradoComponent { }
