import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SERVICES } from '../../environments/services/services';
import { ValidateCodeResponse } from '../../core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private baseUrl = SERVICES.apiGateway.url;

  public validarExistenciaCodigoVerificacion(codigo: string) {
    return this.http.post<ValidateCodeResponse>(this.baseUrl, 
      { 
        C: "USER",
        S: "RECOVERY_INFO",
        id: codigo
      });
  }

}
