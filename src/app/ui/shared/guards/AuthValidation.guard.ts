import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { catchError, map, of } from 'rxjs';

export const authValidationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(route.queryParams);
  return authService.validarExistenciaCodigoVerificacion(route.queryParams['token']).pipe(
    map((response) => {
      return true;
    }),
    catchError((error) => {
      router.navigate(['recovery-password/not-found']);
      return of(false);
    })
  );
};
