import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioRecuperacionComponent } from './pages/formulario-recuperacion/formulario-recuperacion.component';
import { RecoveryLayoutComponent } from './layout/recovery-layout/recovery-layout.component';

const routes: Routes = [
  {
    path: '',
    component: RecoveryLayoutComponent,
    children: [
      {
        path: '',
        component: FormularioRecuperacionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryPasswordRoutingModule { }
