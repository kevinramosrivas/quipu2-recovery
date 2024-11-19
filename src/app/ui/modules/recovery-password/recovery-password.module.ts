import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryPasswordRoutingModule } from './recovery-password-routing.module';
import { FormularioRecuperacionComponent } from './pages/formulario-recuperacion/formulario-recuperacion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NivelSeguridadComponent } from './components/nivel-seguridad/nivel-seguridad.component';
import { ContadorComponent } from './components/contador/contador.component';


@NgModule({
  declarations: [
    FormularioRecuperacionComponent,
    NivelSeguridadComponent,
    ContadorComponent
  ],
  imports: [
    CommonModule,
    RecoveryPasswordRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class RecoveryPasswordModule { }
