import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioRecuperacionComponent } from './pages/formulario-recuperacion/formulario-recuperacion.component';
import { RecoveryLayoutComponent } from './layout/recovery-layout/recovery-layout.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';
import { authValidationGuard } from '../shared/guards/AuthValidation.guard';

const routes: Routes = [
  {
    path: '',
    component: RecoveryLayoutComponent,
    children: [
      {
        path: '',
        component: FormularioRecuperacionComponent,
        canActivate: [authValidationGuard]
      },
      {
        path: 'not-found',
        component: NoEncontradoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryPasswordRoutingModule { }
