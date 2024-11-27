import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { catchError, map, of } from 'rxjs';
import { ValidateCodeResponse } from '../../../core/interfaces/auth.interface';

export const authValidationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!route.queryParams['token']) {
    router.navigate(['recovery-password/code-not-found']);
    return of(false);
  }
  return authService.validarExistenciaCodigoVerificacion(route.queryParams['token']).pipe(
    map((response) => {
      const validateResponse = response as ValidateCodeResponse;
      if (validateResponse.status === 'R') {
        router.navigate(['recovery-password/code-not-found']);
        return false;
      }
      if (new Date(validateResponse.formattedExpireddate) < new Date()) {
        router.navigate(['recovery-password/code-expired']);
        return false;
      }
      return true;
    }),
    catchError((error) => {
      router.navigate(['recovery-password/code-not-found']);
      return of(false);
    })
  );
};
