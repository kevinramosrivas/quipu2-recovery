import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryPasswordRoutingModule } from './recovery-password-routing.module';
import { FormularioRecuperacionComponent } from './pages/formulario-recuperacion/formulario-recuperacion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NivelSeguridadComponent } from './components/nivel-seguridad/nivel-seguridad.component';
import { ContadorComponent } from './components/contador/contador.component';
import { RecoveryLayoutComponent } from './layout/recovery-layout/recovery-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';


@NgModule({
  declarations: [
    FormularioRecuperacionComponent,
    NoEncontradoComponent,
    NivelSeguridadComponent,
    ContadorComponent,
    RecoveryLayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RecoveryPasswordRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class RecoveryPasswordModule { }
