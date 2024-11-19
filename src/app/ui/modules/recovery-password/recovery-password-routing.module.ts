import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioRecuperacionComponent } from './pages/formulario-recuperacion/formulario-recuperacion.component';

const routes: Routes = [
  {
    path: '',
    component: FormularioRecuperacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryPasswordRoutingModule { }
