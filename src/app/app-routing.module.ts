import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: 'recovery-password', 
    loadChildren: () => import('./ui/recovery-password/recovery-password.module').then(m => m.RecoveryPasswordModule)
  },
  {
    path: '**',
    redirectTo: 'recovery-password'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
