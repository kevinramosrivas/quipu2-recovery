import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { ChangePasswordRequest, ErrorResponse, ValidateCodeResponse } from '../../../core/interfaces/auth.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private baseUrl = environment.apiGateway.url;

  private handleError(error: HttpErrorResponse){
    return throwError(() => {
      let message = 'Un error ha ocurrido, por favor intenta de nuevo';
      let timestamp = new Date().getTime().toString();

      return {message, timestamp} as ErrorResponse
    })
  }

  public validarExistenciaCodigoVerificacion(codigo: string) {
    return this.http.post<ValidateCodeResponse | ErrorResponse>(this.baseUrl,{ C: "USER",S: "RECOVERY_INFO",id: codigo})
    .pipe(
        catchError(this.handleError)
    );
  }

  public cambiarContrasena(parameters: ChangePasswordRequest){
    return this.http.post<ErrorResponse>(this.baseUrl,{ C: "USER",S: "RECOVERY_END", ...parameters})
    .pipe(
        catchError(this.handleError)
    );
  }

}
